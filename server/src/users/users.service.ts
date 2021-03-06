import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { generate as generatePassword } from 'generate-password';

import { env } from '../common/env';
import { brackets, resolveAsyncRelation } from '../common/utils';
import { GsuiteService, SlackService } from '../integrations';
import { CloudinaryService, MailerService } from '../services';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly gsuiteService: GsuiteService,
    private readonly slackService: SlackService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly mailerService: MailerService,
  ) {}

  getGuilds = resolveAsyncRelation(this.userRepository, 'guilds');

  getSquads = resolveAsyncRelation(this.userRepository, 'squads');

  findById(id: string) {
    if (!id) return null;

    return this.userRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.userRepository.findOneOrFail(id);
  }

  findAll({ role, search, ids, withDeleted }: GetUsersArgs) {
    const query = this.userRepository.createQueryBuilder('user');

    if (ids && ids.length) {
      query.andWhereInIds(ids);
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    if (search) {
      const searchQuery = brackets(
        ['user.fullName LIKE :search', 'user.primaryEmail LIKE :search', 'user.recoveryEmail LIKE :search'].join(
          ' OR ',
        ),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    if (withDeleted) {
      query.withDeleted();
    }

    query.orderBy('user.fullName', 'ASC');

    return query.getMany();
  }

  async create(input: CreateUserInput) {
    const pastUser = await this.userRepository.findOne({
      where: { recoveryEmail: input.recoveryEmail },
      withDeleted: true,
    });
    const userData: Partial<User> = pastUser ? { ...pastUser, deletedAt: null } : input;

    let user: User;
    let password: string;

    if (env.APP_ENV === 'production') {
      password = generatePassword({ numbers: true });
      const { id: googleId } = await this.gsuiteService.createGsuiteUser({ ...input, password });

      user = await this.userRepository.save({ ...userData, googleId, password: null });
    } else {
      if (!input.password?.trim()) {
        throw new BadRequestException('User password is a required field for all non-production environments');
      }

      const googleId = crypto.randomBytes(12).toString('hex');

      user = await this.userRepository.save({ ...userData, googleId });
    }

    await this.mailerService.sendInvitationEmail({
      to: input.recoveryEmail,
      email: input.primaryEmail,
      password,
    });

    return user;
  }

  async update({ id, ...input }: UpdateUserInput) {
    const rawUser = await this.userRepository.findOneOrFail(id);
    const user = await this.userRepository.save({ ...rawUser, ...input });

    if (env.APP_ENV === 'production') {
      if (user.googleId) {
        await this.gsuiteService.syncGsuiteUser({ googleId: user.googleId });
      }

      if (user.slackId) {
        await this.slackService.syncSlackUser({ slackId: user.slackId });
      }
    }

    return user;
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOneOrFail(userId, { relations: ['guilds', 'squads', 'successes'] });

    if (env.APP_ENV === 'production') {
      const slackUser = await this.slackService.getSlackUser({ slackId: user.slackId });

      if (slackUser && !slackUser.deleted) {
        throw new ConflictException('You cannot delete user with active Slack account');
      }

      const gsuiteUser = await this.gsuiteService.getGsuiteUser({ googleId: user.googleId });

      if (gsuiteUser?.id) {
        throw new ConflictException('You cannot delete user with active Google account');
      }
    }

    if (user.image.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserImage(user.id);
    }

    if (user.thumbnail.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserThumbnail(user.id);
    }

    if (user.successes.length || user.guilds.length || user.squads.length) {
      await this.userRepository.softRemove(user);
    } else {
      await this.userRepository.remove(user);
    }

    return true;
  }
}

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { TeamRole } from '../../common/enums';
import { resolveAsyncRelation } from '../../common/utils';
import { GsuiteService } from '../../integrations';
import { Chapter } from '../chapters/chapter.model';
import { SquadMember } from '../squad-members/squad-member.model';
import { CreateSquadPositionInput } from './dto/create-squad-position.input';
import { GetSquadPositionsArgs } from './dto/get-squad-positions.args';
import { UpdateSquadPositionInput } from './dto/update-squad-position.input';
import { SquadPosition } from './squad-position.model';
import { SquadPositionRepository } from './squad-position.repository';

@Injectable()
export class SquadPositionsService {
  constructor(
    private readonly squadPositionRepository: SquadPositionRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  getMember = resolveAsyncRelation(this.squadPositionRepository, 'member');
  getChapter = resolveAsyncRelation(this.squadPositionRepository, 'chapter');
  getPosition = resolveAsyncRelation(this.squadPositionRepository, 'position');

  findById(id: string) {
    if (!id) return null;

    return this.squadPositionRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.squadPositionRepository.findOneOrFail(id);
  }

  async findAll({ squadId, memberId }: GetSquadPositionsArgs) {
    const query = this.squadPositionRepository.createQueryBuilder('squadPosition');

    query.innerJoinAndSelect('squadPosition.member', 'member');
    query.where('member.squadId = :squadId', { squadId });

    if (memberId) {
      query.andWhere('squadPosition.memberId = :memberId', { memberId });
    }

    return query.getMany();
  }

  async create({ squadId: _squadId, ...input }: CreateSquadPositionInput) {
    const squadPosition = await this.squadPositionRepository.save(input);

    try {
      await this.updateInGoogle(squadPosition);
    } catch (ex) {
      this.squadPositionRepository.delete(squadPosition.id);
      throw ex;
    }

    return squadPosition;
  }

  async update({ id, squadId: _squadId, ...input }: UpdateSquadPositionInput) {
    const squadPosition = await this.squadPositionRepository.findOne({ id }, { relations: ['member'] });

    if (squadPosition.member.deletedAt) {
      throw new ConflictException(' You cannot update role of archived member');
    }

    const updatedSquadPosition = await this.squadPositionRepository.save({
      ...squadPosition,
      ...input,
    });

    try {
      await this.updateInGoogle(squadPosition);
    } catch (ex) {
      await this.squadPositionRepository.save(squadPosition);
      throw ex;
    }

    return updatedSquadPosition;
  }

  async delete(id: string) {
    const squadPosition = await this.squadPositionRepository.findOneOrFail({
      where: { id },
      relations: ['member', 'chapter'],
    });

    if (squadPosition.member.deletedAt) {
      throw new ConflictException(' You cannot delete role of archived member');
    }

    await this.squadPositionRepository.delete(id);

    try {
      await this.updateInGoogle(squadPosition, squadPosition.chapter, squadPosition.member);
    } catch (ex) {
      await this.squadPositionRepository.save(squadPosition);
      throw ex;
    }

    return true;
  }

  async updateInGoogle(squadPosition: SquadPosition, chapter?: Chapter, member?: SquadMember) {
    const { memberId, chapterId } = squadPosition;

    if (!chapterId) return true;

    const squadPositions = await this.squadPositionRepository.find({ where: { memberId, chapterId } });
    const { googleId: groupId } = chapter || (await this.getChapter(squadPosition));
    const memberRecord = member || (await this.getMember(squadPosition));
    const { googleId: userId } = await memberRecord.user;

    const isActive = squadPositions.some(({ to }) => !to);
    const isMember = await this.gsuiteService.hasMember({ groupId, userId });

    if (isActive && !isMember) {
      await this.gsuiteService.createMember({ groupId, userId, role: TeamRole.MEMBER });
    }

    if (!isActive && isMember) {
      await this.gsuiteService.deleteMember({ groupId, userId });
    }

    return true;
  }
}

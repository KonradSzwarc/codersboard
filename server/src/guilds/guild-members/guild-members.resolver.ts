import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../../common/decorators';
import { TeamRole } from '../../common/enums';
import { TeamRoleGuard } from '../../common/guards';
import { GuildPosition } from '../guild-positions/guild-position.model';
import { CreateGuildMemberInput } from './dto/create-guild-member.input';
import { DeleteGuildMemberArgs } from './dto/delete-guild-member.args';
import { GetGuildMembersArgs } from './dto/get-guild-members.args';
import { UpdateGuildMemberInput } from './dto/update-guild-member.input';
import { GuildMember } from './guild-member.model';
import { GuildMembersService } from './guild-members.service';

@Resolver(of => GuildMember)
@TeamKind('guild')
export class GuildMembersResolver {
  constructor(private readonly guildMembersService: GuildMembersService) {}

  @ResolveField('positions', returns => [GuildPosition])
  async getPositions(@Parent() guildMember: GuildMember, @Args('active', { nullable: true }) active?: boolean) {
    return this.guildMembersService.getPositions(guildMember, active);
  }

  @Query(returns => [GuildMember], { name: 'guildMembers' })
  getGuildMembers(@Args() args?: GetGuildMembersArgs) {
    return this.guildMembersService.findAll(args);
  }

  @Mutation(returns => GuildMember)
  @TeamRoleGuard(TeamRole.OWNER, 'data.guildId')
  createGuildMember(@Args('data') input: CreateGuildMemberInput) {
    return this.guildMembersService.create(input);
  }

  @Mutation(returns => GuildMember)
  @TeamRoleGuard(TeamRole.OWNER, 'data.guildId')
  updateGuildMember(@Args('data') input: UpdateGuildMemberInput) {
    return this.guildMembersService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.OWNER, 'guildId')
  deleteGuildMember(@Args() args: DeleteGuildMemberArgs) {
    return this.guildMembersService.delete(args.id);
  }
}

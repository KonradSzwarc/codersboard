import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { TeamModel } from '../common/models';
import { Clan } from './clans/clan.model';
import { GuildMember } from './guild-members/guild-member.model';

@ObjectType()
@Entity()
export class Guild extends TeamModel {
  @Column()
  @Field()
  color: string;

  @Column()
  @Field()
  image: string;

  @Field(type => [Clan])
  @OneToMany(type => Clan, clan => clan.guild)
  clans: Clan[];

  @Field(type => [GuildMember])
  @OneToMany(type => GuildMember, member => member.guild)
  members: GuildMember[];
}

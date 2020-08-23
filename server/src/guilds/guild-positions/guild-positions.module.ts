import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../../integrations/integrations.module';
import { GuildPositionRepository } from './guild-position.repository';
import { GuildPositionsResolver } from './guild-positions.resolver';
import { GuildPositionsService } from './guild-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildPositionRepository]), IntegrationsModule],
  providers: [GuildPositionsService, GuildPositionsResolver],
  exports: [GuildPositionsService],
})
export class GuildPositionsModule {}
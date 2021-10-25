import { Module } from '@nestjs/common';
import { TeamMatchesService } from './team-matches.service';
import { TeamMatchesController } from './team-matches.controller';

@Module({
  controllers: [TeamMatchesController],
  providers: [TeamMatchesService],
})
export class TeamMatchesModule {}

import { Module } from '@nestjs/common';
import { TeamMatchesService } from './team-matches.service';
import { TeamMatchesController } from './team-matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { TeamMatch } from './entities/team-match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamMatch])],
  exports: [TypeOrmModule],
  controllers: [TeamMatchesController],
  providers: [TeamMatchesService],
})
export class TeamMatchesModule {}

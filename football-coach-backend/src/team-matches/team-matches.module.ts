import { Module } from "@nestjs/common";
import { TeamMatchesService } from "./team-matches.service";
import { TeamMatchesController } from "./team-matches.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "src/teams/entities/team.entity";
import { TeamMatch } from "./entities/team-match.entity";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { PlayerStatisticsService } from "src/player-statistics/player-statistics.service";

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamMatch, PlayerStatistic])],
  controllers: [TeamMatchesController],
  providers: [TeamMatchesService, PlayerStatisticsService],
})
export class TeamMatchesModule {}

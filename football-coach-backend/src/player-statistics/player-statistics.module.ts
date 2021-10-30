import { Module } from "@nestjs/common";
import { PlayerStatisticsService } from "./player-statistics.service";
import { PlayerStatisticsController } from "./player-statistics.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerStatistic } from "./entities/player-statistic.entity";
import { TeamMatch } from "src/team-matches/entities/team-match.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerStatistic, TeamMatch])],
  controllers: [PlayerStatisticsController],
  providers: [PlayerStatisticsService],
})
export class PlayerStatisticsModule {}

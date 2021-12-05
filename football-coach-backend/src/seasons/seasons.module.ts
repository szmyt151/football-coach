import { Module } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";
import { SeasonsController } from "./seasons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Season } from "./entities/season.entity";
import { Team } from "src/teams/entities/team.entity";
import { PlayerStatisticsService } from "src/player-statistics/player-statistics.service";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Season, Team, PlayerStatistic])],
  controllers: [SeasonsController],
  providers: [SeasonsService, PlayerStatisticsService],
})
export class SeasonsModule {}

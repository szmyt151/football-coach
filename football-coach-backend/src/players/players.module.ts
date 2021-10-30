import { Module } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { PlayersController } from "./players.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "./entities/player.entity";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { Team } from "src/teams/entities/team.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerStatistic, Team, Player])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}

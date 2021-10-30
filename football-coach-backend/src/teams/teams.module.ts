import { Module } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./entities/team.entity";
import { Player } from "src/players/entities/player.entity";
import { Training } from "src/training/entities/training.entity";
import { Connection } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Training])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {
  constructor(private connection: Connection) {}
}

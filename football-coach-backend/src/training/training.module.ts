import { Module } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { TrainingController } from "./training.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "src/players/entities/player.entity";
import { Team } from "src/teams/entities/team.entity";
import { Training } from "./entities/training.entity";
import { Connection } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Training])],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {
  constructor(private connection: Connection) {}
}

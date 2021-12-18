import { Player } from "src/players/entities/player.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

export enum TrainingEnum {
  CARDIO = "Cardio",
  TACTICS = "Tactics",
  BEFORE_MATCH = "Before match",
  GYM = "Gym",
}

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column("enum", { enum: TrainingEnum })
  trainingType: string;

  @OneToOne((type) => Team, (team) => team.id)
  @JoinColumn()
  team: Team;

  @OneToMany((type) => Player, (player) => player.id)
  @JoinColumn()
  player: Player[];
}

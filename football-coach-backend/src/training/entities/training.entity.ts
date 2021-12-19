import { Player } from "src/players/entities/player.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";

export enum TrainingEnum {
  CARDIO = "Cardio",
  TACTICS = "Tactics",
  BEFORE_MATCH = "Before match",
  GYM = "Gym",
}

@Entity()
export class Training {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column()
  trainingType: string;

  @Column()
  description: string;

  @ManyToOne((type) => Team, (team) => team.id)
  @JoinTable({ name: "teamId" })
  team: Team;

  @ManyToOne((type) => Staff, (staff) => staff.id)
  @JoinTable({ name: "staffId" })
  staff: Staff;

  @ManyToMany((type) => Player, (player) => player.id)
  @JoinTable()
  player: Player[];
}

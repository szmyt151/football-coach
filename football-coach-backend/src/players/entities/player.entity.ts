import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { Team } from "src/teams/entities/team.entity";
import { Training } from "src/training/entities/training.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum PlayerPositionEnum {
  GK = "GK - Goalkeeper",
  CB = "CB - Center Back",
  RB = "RB - Right Back",
  LB = "LB - Left Back",
  LM = "LM - Left Midfielder",
  RM = "RM - Right Midfielder",
  CDM = "CDM - Center Defender Midfielder",
  CM = "CM - Center Midfielder",
  CAM = "CAM - Center Attacker Midfielder",
  RW = "RW - Right Winger",
  LW = "LW - Left Winger",
  LF = "LF - Left Forward",
  RF = "RF - Right Forward",
  CF = "CF - Center Forward",
  ST = "ST - Striker",
}

export enum PlayerFootEnum {
  LEFT = "Left",
  RIGHT = "Right",
  BOTH = "Both",
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  nationality: string;

  @Column()
  birth: Date;

  @Column("enum", { enum: PlayerFootEnum })
  preferredFoot: string;

  @Column("enum", { enum: PlayerPositionEnum })
  playerPosition: string;

  @Column({ nullable: true })
  firstsquad: boolean;

  @Column({ default: Math.floor(Math.random() * (99 - 1 + 1) + 1) })
  shirtNumber: number;

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn()
  team: Team;

  @OneToMany(
    (type) => PlayerStatistic,
    (playerStatistic) => playerStatistic.player
  )
  @JoinTable()
  playerStatistics: PlayerStatistic[];

  @ManyToMany((type) => Training, (training) => training.id)
  @JoinTable()
  trainings: Training[];
}

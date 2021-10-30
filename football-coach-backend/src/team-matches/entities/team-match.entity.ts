import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum TeamMatchResultEnum {
  WIN = "Win",
  LOSE = "Lose",
  TIE = "Tie",
}

export enum HomeAwayEnum {
  HOME = "Home",
  AWAY = "Away",
}

@Entity()
export class TeamMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  opponent: string;

  @Column("enum", { enum: TeamMatchResultEnum })
  matchResult: string;

  @Column("enum", { enum: HomeAwayEnum })
  homeAway: string;

  @OneToOne((type) => Team, (team) => team.id)
  @JoinColumn()
  team: number;

  @OneToOne((type) => Team, (team) => team.id)
  @JoinColumn()
  oponentInDatabase: number;

  @OneToMany((type) => PlayerStatistic, (playerStats) => playerStats.id)
  @JoinColumn()
  playerStatistics: number[];
}

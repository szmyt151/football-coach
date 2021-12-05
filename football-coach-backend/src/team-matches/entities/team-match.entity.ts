import { Season } from "src/seasons/entities/season.entity";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  scoreHome: number;

  @Column()
  scoreAway: number;

  @ManyToOne((type) => Season, (season) => season.id)
  @JoinColumn()
  season: Season;

  @Column({ nullable: true })
  homeTeamId: number;

  @OneToOne((type) => Team, (team) => team.id)
  @JoinColumn({ name: "homeTeamId" })
  homeTeam: Team;

  @Column({ nullable: true })
  awayTeamId: number;

  @OneToOne((type) => Team, (team) => team.id)
  @JoinColumn({ name: "awayTeamId" })
  awayTeam: Team;

  @OneToMany((type) => PlayerStatistic, (playerStats) => playerStats.id)
  @JoinColumn()
  playerStatistics: PlayerStatistic[];
}

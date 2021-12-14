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

@Entity()
export class TeamMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  date: string;

  @Column()
  scoreHome: number;

  @Column()
  scoreAway: number;

  @Column({ nullable: true })
  homeTeamId: number;

  @Column({ nullable: true })
  awayTeamId: number;

  @ManyToOne((type) => Season, (season) => season.id)
  @JoinColumn()
  season: Season;

  @ManyToOne((type) => Team, (team) => team.id)
  @JoinColumn({ name: "homeTeamId" })
  homeTeam: Team;

  @ManyToOne((type) => Team, (team) => team.id)
  @JoinColumn({ name: "awayTeamId" })
  awayTeam: Team;

  @OneToMany((type) => PlayerStatistic, (playerStats) => playerStats.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  playerStatistics: PlayerStatistic[];
}

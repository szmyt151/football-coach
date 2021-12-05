import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { TeamMatch } from "src/team-matches/entities/team-match.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToMany((type) => Team, (team) => team.id)
  @JoinTable()
  teams: Team[];

  @OneToMany((type) => TeamMatch, (teamMatch) => teamMatch.season)
  @JoinColumn()
  seasonMatches: TeamMatch[];

  @JoinColumn()
  @OneToMany((type) => PlayerStatistic, (players) => players.season)
  playerStatistics: PlayerStatistic;
}

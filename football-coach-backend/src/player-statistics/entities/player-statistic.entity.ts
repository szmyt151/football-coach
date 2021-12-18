import { Season } from "src/seasons/entities/season.entity";
import { Player } from "src/players/entities/player.entity";
import { TeamMatch } from "src/team-matches/entities/team-match.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

enum PlayerStatisticType {
  GOAL = "Goal",
  ASSIST = "Assist",
  YELLOW_CARD = "Yellow Card",
  RED_CARD = "Red Card",
  CLEAN_SHEET = "Clean Sheet",
}

@Entity()
export class PlayerStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne((type) => TeamMatch, (teamMatch) => teamMatch.id)
  teamMatch: TeamMatch[];

  @JoinColumn()
  @ManyToOne((type) => Season, (season) => season.id)
  season: Season;

  @JoinColumn()
  @ManyToOne((type) => Player, (player) => player.id)
  player: Player;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  cleanSheets: number;

  @Column()
  yellowCards: number;

  @Column()
  redCards: number;

  @Column({ nullable: true })
  minute: number;

  @Column("enum", { enum: PlayerStatisticType, nullable: true })
  type: string;
}

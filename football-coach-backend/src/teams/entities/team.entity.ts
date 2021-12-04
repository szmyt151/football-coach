import { TeamMatch } from "./../../team-matches/entities/team-match.entity";
import { User } from "./../../users/entities/user.entity";
import { Player } from "src/players/entities/player.entity";
import { Season } from "src/seasons/entities/season.entity";
import { Training } from "src/training/entities/training.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  myTeam: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  userId: User;

  @JoinColumn()
  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @JoinColumn()
  @OneToMany(() => Training, (training) => training.team)
  trainings: Training[];

  @JoinColumn()
  @ManyToOne(() => Season, (season) => season.id)
  seasons: Season[];

  @JoinColumn()
  @ManyToOne(() => TeamMatch, (teamMatch) => teamMatch.team)
  teamMatches: TeamMatch[];
}

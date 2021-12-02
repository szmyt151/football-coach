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
  user: User;

  @OneToMany(() => Player, (player) => player.id)
  players: number[];

  @OneToMany(() => Training, (training) => training.id)
  trainings: number[];

  @ManyToOne(() => Season, (season) => season.id)
  seasons: number[];
}

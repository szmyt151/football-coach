import { Player } from "src/players/entities/player.entity";
import { Season } from "src/seasons/entities/season.entity";
import { Training } from "src/training/entities/training.entity";
import {
  Column,
  Entity,
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

  @OneToMany((type) => Player, (player) => player.id)
  players: number[];

  @OneToMany((type) => Training, (training) => training.id)
  trainings: number[];

  @ManyToOne((type) => Season, (season) => season.id)
  seasons: number[];
}

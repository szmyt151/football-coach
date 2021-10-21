import { Player } from "src/players/entities/player.entity";
import { Training } from "src/training/entities/training.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Player, player => player.id)
  players: Player[];

  @OneToMany(type => Training, training => training.id)
  trainings: Training[];

}

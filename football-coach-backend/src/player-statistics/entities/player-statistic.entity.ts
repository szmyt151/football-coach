import { Player } from "src/players/entities/player.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlayerStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Player, player => player.id)
  player: Player;
  
  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  cleanSheets: number;
}

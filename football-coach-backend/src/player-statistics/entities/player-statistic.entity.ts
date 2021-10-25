import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PlayerStatistic {
  @PrimaryGeneratedColumn()
  id: number;

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
}

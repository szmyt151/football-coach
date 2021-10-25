import { Player } from 'src/players/entities/player.entity';
import { TeamMatch } from 'src/team-matches/entities/team-match.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PlayerStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => TeamMatch, (teamMatch) => teamMatch.id)
  teamMatch: number;

  @OneToOne((type) => Player, (player) => player.id)
  player: number;

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

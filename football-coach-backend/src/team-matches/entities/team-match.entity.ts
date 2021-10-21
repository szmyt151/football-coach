import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TeamMatchResultEnum {
  WIN = 'Win',
  LOSE = 'Lose',
  TIE = 'Tie',
}

@Entity()
export class TeamMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column("enum", { enum: TeamMatchResultEnum })
  matchResult: string;

}

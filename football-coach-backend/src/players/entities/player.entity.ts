import { Team } from "src/teams/entities/team.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PlayerPositionEnum {
  GOALKEAPER = 'Goalkeaper',
  DEFENDER = 'Defender',
  MIDFIELDER = 'Midfielder',
  STRIKER = 'Striker',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birth: Date;

  @Column("enum", { enum: PlayerPositionEnum })
  playerPosition: string;

  @OneToOne(type => Team, team => team.id)
  team: Team;
}

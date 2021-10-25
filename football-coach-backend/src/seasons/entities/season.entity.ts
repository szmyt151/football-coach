import { TeamMatch } from 'src/team-matches/entities/team-match.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Team, (team) => team.id)
  teams: number[];
}

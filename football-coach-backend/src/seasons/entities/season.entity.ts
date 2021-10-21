import { TeamMatch } from "src/team-matches/entities/team-match.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => TeamMatch, team => team.id)
  seasonMatches: TeamMatch[];

}

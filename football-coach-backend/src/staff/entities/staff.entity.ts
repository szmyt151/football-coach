import { Team } from "src/teams/entities/team.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum StaffRole {
  Coach = "Coach",
  Assistant = "Coach Assistant",
  Physiotherapist = "Physiotherapist",
  Gardener = "Greenkepper",
}

@Entity()
export class Staff {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  role: string;

  @ManyToOne((type) => Team, (team) => team.id)
  @JoinTable({ name: "teamId" })
  team: Team;
}

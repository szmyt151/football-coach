import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
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
}

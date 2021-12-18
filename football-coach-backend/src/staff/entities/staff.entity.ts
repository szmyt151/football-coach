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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column("enum", { enum: StaffRole })
  role: string;
}

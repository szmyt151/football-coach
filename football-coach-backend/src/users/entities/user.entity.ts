import { Payment } from "src/payments/entities/payment.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column("boolean")
  isActive: boolean;

  @OneToMany((type) => Payment, (payment) => payment.id)
  @JoinColumn()
  payments: Payment[];

  @JoinColumn()
  @OneToOne((type) => Team, (team) => team.id)
  team: Team;

  @BeforeInsert()
  async setPassword(password: string) {
    // const salt = await bcrypt.genSalt()
    // this.password = await bcrypt.hash(password || this.password, salt)
    this.password = this.password;
  }
}

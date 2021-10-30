// import { Payment } from 'src/payments/entities/payment.entity';

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
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

  @Column('boolean')
  isActive: boolean;

  // @OneToMany((type) => Payment, (payment) => payment.id)
  // @JoinColumn
  // payments: number[];

  @BeforeInsert()
  async setPassword(password: string) {
    // const salt = await bcrypt.genSalt()
    // this.password = await bcrypt.hash(password || this.password, salt)
    this.password = this.password;
  }
}

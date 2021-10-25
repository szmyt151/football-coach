import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PaymentTypeEnum {
  MEMBER_PAYMENT = 'Member payment',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string;

  @Column('enum', { enum: PaymentTypeEnum })
  paymentType: string;

  @OneToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user: User;
}

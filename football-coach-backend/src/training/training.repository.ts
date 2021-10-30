import { Connection } from 'typeorm';
import { Training } from './entities/training.entity';

export const trainingProviders = [
  {
    provide: 'TRAINING_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Training),
    inject: ['DATABASE_CONNECTION'],
  },
];

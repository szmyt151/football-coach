import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const con = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'student',
        password: 'studentpassword',
        database: 'footballCoach',
      });
      return con;
    },
  },
];

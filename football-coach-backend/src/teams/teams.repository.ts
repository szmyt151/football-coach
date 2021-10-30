import { Connection } from 'typeorm';
import { Team } from './entities/team.entity';

export const teamProviders = [
  {
    provide: 'TEAM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Team),
    inject: ['SEQUELIZE'],
  },
];

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { PaymentsModule } from 'src/payments/payments.module';
import { PlayerStatisticsModule } from 'src/player-statistics/player-statistics.module';
import { PlayersModule } from 'src/players/players.module';
import { SeasonsModule } from 'src/seasons/seasons.module';
import { TeamMatchesModule } from 'src/team-matches/team-matches.module';
import { TeamsModule } from 'src/teams/teams.module';
import { TrainingModule } from 'src/training/training.module';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'studentpassword',
      database: 'footballCoach',
      autoLoadEntities: true,
      entities: ['src/**/entity/*.ts', './build/src/entity/*.js'],
      // synchronize: true,
    }),
    UsersModule,
    TeamsModule,
    TrainingModule,
    TeamMatchesModule,
    SeasonsModule,
    PlayersModule,
    PlayerStatisticsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth_old/roles.guard';
import { PaymentsModule } from 'src/payments/payments.module';
import { PlayerStatisticsModule } from 'src/player-statistics/player-statistics.module';
import { PlayersModule } from 'src/players/players.module';
import { SeasonsModule } from 'src/seasons/seasons.module';
import { TeamMatchesModule } from 'src/team-matches/team-matches.module';
import { TeamsModule } from 'src/teams/teams.module';
import { TrainingModule } from 'src/training/training.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'studentpassword',
      database: 'footballCoach',
      autoLoadEntities: true,
      synchronize: true,
    }),
    // AuthModule,
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
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

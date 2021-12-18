import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsModule } from "./payments/payments.module";
import { PlayerStatisticsModule } from "./player-statistics/player-statistics.module";
import { PlayersModule } from "./players/players.module";
import { SeasonsModule } from "./seasons/seasons.module";
import { TeamMatchesModule } from "./team-matches/team-matches.module";
import { TeamsModule } from "./teams/teams.module";
import { TrainingModule } from "./training/training.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "student",
      password: "studentpassword",
      database: "footballCoach",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TeamsModule,
    TrainingModule,
    TeamMatchesModule,
    SeasonsModule,
    PlayersModule,
    PlayerStatisticsModule,
    PaymentsModule,
    AuthModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

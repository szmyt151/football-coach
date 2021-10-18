import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "student",
      "password": "studentpassword",
      "database": "footballCoach",
      "autoLoadEntities": true,
      "synchronize": true
    }),
  ],
  controllers: [AppController],
  providers: [AppService,   {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

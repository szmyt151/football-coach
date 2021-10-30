import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { usersProviders } from './users.repository';
import { Connection } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, ...databaseProviders],
  exports: [TypeOrmModule],
})
export class UsersModule {
  constructor(private connection: Connection) {}
}

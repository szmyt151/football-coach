import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Player } from 'src/players/entities/player.entity';
import { Training } from 'src/training/entities/training.entity';
import { teamProviders } from './teams.repository';
import { Connection } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Training]), DatabaseModule],
  exports: [TypeOrmModule],
  controllers: [TeamsController],
  providers: [TeamsService, ...teamProviders],
})
export class TeamsModule {
  constructor(private connection: Connection) {}
}

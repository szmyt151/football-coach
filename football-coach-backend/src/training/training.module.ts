import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Training } from './entities/training.entity';
import { trainingProviders } from './training.repository';
import { Connection } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Training]), DatabaseModule],
  exports: [TypeOrmModule],
  controllers: [TrainingController],
  providers: [TrainingService, ...trainingProviders],
})
export class TrainingModule {
  constructor(private connection: Connection) {}
}

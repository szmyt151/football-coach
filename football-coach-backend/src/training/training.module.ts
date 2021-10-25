import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Training } from './entities/training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Training])],
  exports: [TypeOrmModule],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}

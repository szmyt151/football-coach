import { Module } from '@nestjs/common';
import { PlayerStatisticsService } from './player-statistics.service';
import { PlayerStatisticsController } from './player-statistics.controller';

@Module({
  controllers: [PlayerStatisticsController],
  providers: [PlayerStatisticsService]
})
export class PlayerStatisticsModule {}

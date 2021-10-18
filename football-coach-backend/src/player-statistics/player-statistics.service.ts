import { Injectable } from '@nestjs/common';
import { CreatePlayerStatisticDto } from './dto/create-player-statistic.dto';
import { UpdatePlayerStatisticDto } from './dto/update-player-statistic.dto';

@Injectable()
export class PlayerStatisticsService {
  create(createPlayerStatisticDto: CreatePlayerStatisticDto) {
    return 'This action adds a new playerStatistic';
  }

  findAll() {
    return `This action returns all playerStatistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playerStatistic`;
  }

  update(id: number, updatePlayerStatisticDto: UpdatePlayerStatisticDto) {
    return `This action updates a #${id} playerStatistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} playerStatistic`;
  }
}

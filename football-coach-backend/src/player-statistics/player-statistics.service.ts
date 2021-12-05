import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePlayerStatisticDto } from "./dto/create-player-statistic.dto";
import { UpdatePlayerStatisticDto } from "./dto/update-player-statistic.dto";
import { PlayerStatistic } from "./entities/player-statistic.entity";

@Injectable()
export class PlayerStatisticsService {
  constructor(
    @InjectRepository(PlayerStatistic)
    private playerStatisticRepository: Repository<PlayerStatistic>
  ) {}

  findAll(): Promise<PlayerStatistic[]> {
    return this.playerStatisticRepository.find();
  }

  findOne(id: number): Promise<PlayerStatistic> {
    return this.playerStatisticRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.playerStatisticRepository.delete(id);
  }

  async create(createPlayerStatisticDto: CreatePlayerStatisticDto) {
    this.playerStatisticRepository.create(createPlayerStatisticDto);
  }

  async update(id: number, updatePlayerStatisticDto: UpdatePlayerStatisticDto) {
    await this.playerStatisticRepository.update(id, updatePlayerStatisticDto);
  }
}

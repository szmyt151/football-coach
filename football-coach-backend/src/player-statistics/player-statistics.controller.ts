import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayerStatisticsService } from './player-statistics.service';
import { CreatePlayerStatisticDto } from './dto/create-player-statistic.dto';
import { UpdatePlayerStatisticDto } from './dto/update-player-statistic.dto';

@Controller('player-statistics')
export class PlayerStatisticsController {
  constructor(
    private readonly playerStatisticsService: PlayerStatisticsService,
  ) {}

  @Post()
  create(@Body() createPlayerStatisticDto: CreatePlayerStatisticDto) {
    return this.playerStatisticsService.create(createPlayerStatisticDto);
  }

  @Get()
  findAll() {
    return this.playerStatisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerStatisticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerStatisticDto: UpdatePlayerStatisticDto,
  ) {
    return this.playerStatisticsService.update(+id, updatePlayerStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerStatisticsService.remove(+id);
  }
}

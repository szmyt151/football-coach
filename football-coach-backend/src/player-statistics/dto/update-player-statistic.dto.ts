import { PartialType } from '@nestjs/swagger';
import { CreatePlayerStatisticDto } from './create-player-statistic.dto';

export class UpdatePlayerStatisticDto extends PartialType(
  CreatePlayerStatisticDto,
) {}

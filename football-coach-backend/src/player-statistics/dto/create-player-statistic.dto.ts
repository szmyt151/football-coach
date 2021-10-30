import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerStatisticDto {
  @ApiProperty()
  goals: number;

  @ApiProperty()
  assists: number;

  @ApiProperty()
  cleanSheets: number;

  @ApiProperty()
  yellowCards: number;

  @ApiProperty()
  redCards: number;

  @ApiProperty()
  player: number;

  @ApiProperty()
  teamMatch: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { Season } from "src/seasons/entities/season.entity";

export class CreateTeamMatchDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  scoreHome: number;

  @ApiProperty()
  scoreAway: number;

  @ApiProperty()
  homeTeamId: number;

  @ApiProperty()
  awayTeamId: number;

  @ApiProperty()
  season: Season;
}

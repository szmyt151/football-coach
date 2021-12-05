import { ApiProperty } from "@nestjs/swagger";
import { Player } from "src/players/entities/player.entity";
import { TeamMatch } from "src/team-matches/entities/team-match.entity";

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
  player: Player[];

  @ApiProperty()
  teamMatch: TeamMatch[];
}

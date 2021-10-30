import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamMatchDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  matchResult: string;

  @ApiProperty()
  homeAway: string;

  @ApiProperty()
  opponent: string;

  @ApiProperty()
  team: number;

  @ApiProperty()
  oponentInDatabase: number;
}

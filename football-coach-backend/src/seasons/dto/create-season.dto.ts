import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/entities/team.entity";

export class CreateSeasonDto {
  @ApiProperty()
  teams: Team[];

  @ApiProperty()
  name: string;
}

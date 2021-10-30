import { ApiProperty } from "@nestjs/swagger";

export class CreateSeasonDto {
  @ApiProperty()
  teams: number[];
}

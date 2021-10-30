import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  numbers: number[];
  @ApiProperty()
  trainings: number[];
}

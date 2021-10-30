import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birth: Date;

  @ApiProperty()
  preferredFoot: string;

  @ApiProperty()
  playerPosition: string;

  @ApiProperty()
  team: number;

  @ApiProperty()
  playerStatistics: number[];
}

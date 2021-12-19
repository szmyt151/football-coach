import { ApiProperty } from "@nestjs/swagger";

export class CreateTrainingDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  trainingType: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  teamId: string;

  @ApiProperty()
  staffId: string;

  @ApiProperty()
  player: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateTrainingDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  trainingType: string;

  @ApiProperty()
  duration: number;
}

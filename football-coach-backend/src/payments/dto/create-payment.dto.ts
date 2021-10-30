import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  paymentType: string;

  @ApiProperty()
  user: number;
}

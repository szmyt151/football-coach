import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./entities/payment.entity";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private playerStatisticRepository: Repository<Payment>
  ) {}

  findAll(): Promise<Payment[]> {
    return this.playerStatisticRepository.find({ relations: ["user"] });
  }

  findOne(id: number): Promise<Payment> {
    return this.playerStatisticRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async remove(id: number): Promise<void> {
    await this.playerStatisticRepository.delete(id);
  }

  async create(createPaymentDto: CreatePaymentDto) {
    this.playerStatisticRepository.create(createPaymentDto);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.playerStatisticRepository.update(id, updatePaymentDto);
  }
}

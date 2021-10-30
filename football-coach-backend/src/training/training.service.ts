import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingService {
  constructor(
    @Inject('TRAINING_REPOSITORY')
    private trainingRepository: Repository<Training>,
  ) {}
  findAll(): Promise<Training[]> {
    return this.trainingRepository.find();
  }

  findOne(id: number): Promise<Training> {
    return this.trainingRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }

  async create(createTrainingDto: CreateTrainingDto) {
    await this.trainingRepository.create(createTrainingDto);
  }

  async update(id: number, updateTrainingDto: UpdateTrainingDto) {
    await this.trainingRepository.update(id, updateTrainingDto);
  }
}

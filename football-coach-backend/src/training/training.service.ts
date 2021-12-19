import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "src/players/entities/player.entity";
import { Team } from "src/teams/entities/team.entity";
import { Repository } from "typeorm";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { Training } from "./entities/training.entity";

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>
  ) {}
  findAll(): Promise<Training[]> {
    return this.trainingRepository.find({
      relations: ["team", "player", "staff"],
    });
  }

  findOne(id: number): Promise<Training> {
    return this.trainingRepository.findOne({
      where: { id },
      relations: ["team", "player", "staff"],
    });
  }

  async remove(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }

  async create(createTrainingDto: CreateTrainingDto) {
    const trainingDto = {
      ...createTrainingDto,
      player: createTrainingDto.player.split(",").map((e) => {
        return <Player>{ id: parseInt(e) };
      }),
      teamId: createTrainingDto.teamId,
      staffId: createTrainingDto.staffId,
      team: <any>createTrainingDto.teamId,
    };
    console.log(trainingDto);
    const training = this.trainingRepository.create(trainingDto);
    console.log(training);
    return this.trainingRepository.save(training);

    // await this.trainingRepository.create(createTrainingDto);
  }

  async update(id: number, updateTrainingDto: UpdateTrainingDto) {
    // await this.trainingRepository.update(id, updateTrainingDto);
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSeasonDto } from "./dto/create-season.dto";
import { UpdateSeasonDto } from "./dto/update-season.dto";
import { Season } from "./entities/season.entity";

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private seasonMatchRepository: Repository<Season>
  ) {}

  findAll(): Promise<Season[]> {
    return this.seasonMatchRepository.find();
  }

  findOne(id: number): Promise<Season> {
    return this.seasonMatchRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.seasonMatchRepository.delete(id);
  }

  async create(createSeasonDto: CreateSeasonDto) {
    this.seasonMatchRepository.create(createSeasonDto);
  }

  async update(id: number, updateSeasonDto: UpdateSeasonDto) {
    await this.seasonMatchRepository.update(id, updateSeasonDto);
  }
}

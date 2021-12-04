import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { Team } from "./entities/team.entity";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ["userId"] });
  }

  findOne(id: number): Promise<Team> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ["userId", "players", "seasons", "teamMatches", "trainings"],
    });
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }

  async create(createTeamDto: CreateTeamDto) {
    await this.teamRepository.insert(createTeamDto);
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    await this.teamRepository.update(id, updateTeamDto);
  }
}

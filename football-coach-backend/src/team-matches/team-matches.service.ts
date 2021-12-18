import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
import { Repository } from "typeorm";
import { CreateTeamMatchDto } from "./dto/create-team-match.dto";
import { UpdateTeamMatchDto } from "./dto/update-team-match.dto";
import { TeamMatch } from "./entities/team-match.entity";

@Injectable()
export class TeamMatchesService {
  constructor(
    @InjectRepository(TeamMatch)
    private teamMatchRepository: Repository<TeamMatch>
  ) {}

  findAll(): Promise<TeamMatch[]> {
    return this.teamMatchRepository.find({
      relations: ["season", "homeTeam", "awayTeam"],
    });
  }

  async findOne(id: number) {
    return this.teamMatchRepository.findOne({
      where: {
        id,
      },
      relations: ["homeTeam", "awayTeam"],
    });
  }

  async remove(id: number): Promise<void> {
    await this.teamMatchRepository.delete(id);
  }

  async create(createTeamMatchDto: CreateTeamMatchDto) {
    const teamMatch = await this.teamMatchRepository.create(createTeamMatchDto);
    return await this.teamMatchRepository.save(teamMatch);
  }

  async update(id: number, updateTeamMatchDto: UpdateTeamMatchDto) {
    await this.teamMatchRepository.update(id, updateTeamMatchDto);
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

  findOne(id: number): Promise<TeamMatch> {
    return this.teamMatchRepository.findOne({
      where: {
        id,
      },
      relations: ["season", "homeTeam", "awayTeam", "playerStatistics"],
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

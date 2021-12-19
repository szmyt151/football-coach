import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "src/teams/entities/team.entity";
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
    return this.seasonMatchRepository.find({
      relations: ["teams", "seasonMatches"],
    });
  }

  findOne(id: number): Promise<Season> {
    return this.seasonMatchRepository.findOne({
      where: { id },
      relations: ["teams", "seasonMatches"],
    });
  }

  async remove(id: number) {
    return await this.seasonMatchRepository.delete(id);
  }

  async create(createSeasonDto: CreateSeasonDto) {
    const seasonDto = {
      ...createSeasonDto,
      teams: createSeasonDto.teams.split(",").map((e) => {
        return <Team>{ id: parseInt(e) };
      }),
    };
    const season = this.seasonMatchRepository.create(seasonDto);
    console.log(season);
    return this.seasonMatchRepository.save(season);
  }

  async update(id: number, updateSeasonDto: UpdateSeasonDto) {
    const seasonDto = {
      ...updateSeasonDto,
      teams: updateSeasonDto.teams.split(",").map((e) => {
        return <Team>{ id: parseInt(e) };
      }),
    };
    return this.seasonMatchRepository.update(id, seasonDto);
    // console.log(season);
    // return this.seasonMatchRepository.save(season);

    // await this.seasonMatchRepository.update(id, updateSeasonDto);
  }
}

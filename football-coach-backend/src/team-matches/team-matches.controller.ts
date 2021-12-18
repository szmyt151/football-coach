import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeamMatchesService } from "./team-matches.service";
import { CreateTeamMatchDto } from "./dto/create-team-match.dto";
import { UpdateTeamMatchDto } from "./dto/update-team-match.dto";
import { PlayerStatisticsService } from "src/player-statistics/player-statistics.service";

@Controller("team-matches")
export class TeamMatchesController {
  constructor(
    private readonly teamMatchesService: TeamMatchesService,
    private readonly playerStatisticsService: PlayerStatisticsService
  ) {}

  @Post()
  create(@Body() createTeamMatchDto: CreateTeamMatchDto) {
    return this.teamMatchesService.create(createTeamMatchDto);
  }

  @Get()
  findAll() {
    return this.teamMatchesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const teamMatch = await this.teamMatchesService.findOne(+id);

    const playerStatistics = (
      await this.playerStatisticsService.getStatisticsPerMatch(teamMatch.id)
    ).sort((a, b) => a.minute - b.minute);

    return { ...teamMatch, playerStatistics };
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeamMatchDto: UpdateTeamMatchDto
  ) {
    return this.teamMatchesService.update(+id, updateTeamMatchDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teamMatchesService.remove(+id);
  }
}

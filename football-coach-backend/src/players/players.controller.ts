import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PlayersService } from "./players.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { PlayerFootEnum, PlayerPositionEnum } from "./entities/player.entity";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";

@Controller("players")
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get("/positions")
  playersPosition() {
    return PlayerPositionEnum;
  }

  @Get("/foot")
  playersFoot() {
    return PlayerFootEnum;
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const data = await this.playersService.findOne(id);

    let stats = {
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      cleanSheets: 0,
    };

    data.playerStatistics.forEach((stat) => {
      stats.goals += stat.goals;
      stats.assists += stat.assists;
      stats.yellowCards += stat.yellowCards;
      stats.redCards += stat.redCards;
      stats.cleanSheets += stat.cleanSheets;
    });

    return { ...data, stats };
  }

  @Get("/team/:teamid")
  async findPlayersByTeam(@Param("teamid") id: number) {
    const data = await this.playersService.findPlayersByTeam(id);
    console.log({ data });
    return data;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playersService.remove(+id);
  }
}

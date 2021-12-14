import { PlayerStatisticsService } from "./../player-statistics/player-statistics.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SeasonsService } from "./seasons.service";
import { CreateSeasonDto } from "./dto/create-season.dto";
import { UpdateSeasonDto } from "./dto/update-season.dto";
import { PlayerStatistic } from "src/player-statistics/entities/player-statistic.entity";
var _ = require("lodash");

@Controller("seasons")
export class SeasonsController {
  constructor(
    private readonly seasonsService: SeasonsService,
    private readonly playerStatisticsService: PlayerStatisticsService
  ) {}

  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get()
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const season = await this.seasonsService.findOne(+id);

    let standings = season.teams.map((t) => {
      return {
        teamId: t.id,
        teamName: t.name,
      };
    });

    let standings2 = standings.map((t) => {
      const away =
        season.seasonMatches.filter((match) => {
          return match.awayTeamId === t.teamId;
        }) || [];

      const home =
        season.seasonMatches.filter((match) => {
          return match.homeTeamId === t.teamId;
        }) || [];

      return {
        ...t,
        matches: {
          away,
          home,
        },
      };
    });

    const callculateWins = (awayMatches, homeMatches) => {
      const away = awayMatches.reduce(
        (prev, curr, index, matches) =>
          curr.scoreAway > curr.scoreHome ? 1 + prev : 0 + prev,
        0
      );

      const home = homeMatches.reduce(
        (prev, curr, index, matches) =>
          curr.scoreAway < curr.scoreHome ? 1 + prev : 0 + prev,
        0
      );
      return home + away;
    };

    const callculateDraw = (awayMatches, homeMatches) => {
      const away = awayMatches.reduce(
        (prev, curr, index, matches) =>
          curr.scoreAway === curr.scoreHome ? 1 + prev : 0 + prev,
        0
      );

      const home = homeMatches.reduce(
        (prev, curr, index, matches) =>
          curr.scoreAway === curr.scoreHome ? 1 + prev : 0 + prev,
        0
      );
      return home + away;
    };

    let standings3 = standings2.map((t) => {
      const wins = callculateWins(t.matches.away, t.matches.home);
      const lose = callculateWins(t.matches.home, t.matches.away);
      const draw = callculateDraw(t.matches.home, t.matches.away);
      return {
        ...t,
        tableRow: {
          name: t.teamName,
          wins,
          draw,
          lose,
          points: 3 * wins + draw,
        },
      };
    });

    const tableData = standings3
      .map((s) => s.tableRow)
      .sort((a, b) => b.points - a.points)
      .map((e, index) => {
        return { ...e, place: index + 1 };
      });

    let seasonStatistics =
      await this.playerStatisticsService.getStatisticsPerSeasonId(id);

    const groupedPersons = _.groupBy(seasonStatistics, "player.id");

    const stats = Object.values(groupedPersons)
      .map((playerStats: PlayerStatistic[]) => {
        const goals = playerStats.reduce(
          (prevValue, currentValue) => currentValue.goals + prevValue,
          0
        );
        const assists = playerStats.reduce(
          (prevValue, currentValue) => currentValue.assists + prevValue,
          0
        );
        const cleanSheets = playerStats.reduce(
          (prevValue, currentValue) => currentValue.cleanSheets + prevValue,
          0
        );
        const yellowCards = playerStats.reduce(
          (prevValue, currentValue) => currentValue.yellowCards + prevValue,
          0
        );
        const redCards = playerStats.reduce(
          (prevValue, currentValue) => currentValue.redCards + prevValue,
          0
        );

        return {
          goals,
          assists,
          cleanSheets,
          yellowCards,
          redCards,
          player: playerStats[0].player,
        };
      })
      .sort((a, b) => b.goals - a.goals);
    return {
      ...season,
      standings: standings3,
      tableData,
      seasonStatistics,
      stats,
    };
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
    return this.seasonsService.update(+id, updateSeasonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seasonsService.remove(+id);
  }
}

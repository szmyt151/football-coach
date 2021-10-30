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
import { PlayerPositionEnum } from "./entities/player.entity";

@Controller("players")
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get("players/positions")
  playersPosition() {
    return PlayerPositionEnum;
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playersService.findOne(+id);
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

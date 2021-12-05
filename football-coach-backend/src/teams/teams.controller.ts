import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { Logger } from "@nestjs/common";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    Logger.log("info", createTeamDto);
    Logger.warn("warning", createTeamDto);
    Logger.error("something went wrong! ", createTeamDto);
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.teamsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.teamsService.remove(+id);
  }
}

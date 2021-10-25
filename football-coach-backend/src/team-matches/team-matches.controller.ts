import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamMatchesService } from './team-matches.service';
import { CreateTeamMatchDto } from './dto/create-team-match.dto';
import { UpdateTeamMatchDto } from './dto/update-team-match.dto';

@Controller('team-matches')
export class TeamMatchesController {
  constructor(private readonly teamMatchesService: TeamMatchesService) {}

  @Post()
  create(@Body() createTeamMatchDto: CreateTeamMatchDto) {
    return this.teamMatchesService.create(createTeamMatchDto);
  }

  @Get()
  findAll() {
    return this.teamMatchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMatchesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMatchDto: UpdateTeamMatchDto,
  ) {
    return this.teamMatchesService.update(+id, updateTeamMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamMatchesService.remove(+id);
  }
}

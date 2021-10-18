import { Injectable } from '@nestjs/common';
import { CreateTeamMatchDto } from './dto/create-team-match.dto';
import { UpdateTeamMatchDto } from './dto/update-team-match.dto';

@Injectable()
export class TeamMatchesService {
  create(createTeamMatchDto: CreateTeamMatchDto) {
    return 'This action adds a new teamMatch';
  }

  findAll() {
    return `This action returns all teamMatches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMatch`;
  }

  update(id: number, updateTeamMatchDto: UpdateTeamMatchDto) {
    return `This action updates a #${id} teamMatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMatch`;
  }
}

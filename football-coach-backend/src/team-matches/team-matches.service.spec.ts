import { Test, TestingModule } from '@nestjs/testing';
import { TeamMatchesService } from './team-matches.service';

describe('TeamMatchesService', () => {
  let service: TeamMatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMatchesService],
    }).compile();

    service = module.get<TeamMatchesService>(TeamMatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

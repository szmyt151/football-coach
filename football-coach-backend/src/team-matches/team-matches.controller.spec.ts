import { Test, TestingModule } from "@nestjs/testing";
import { TeamMatchesController } from "./team-matches.controller";
import { TeamMatchesService } from "./team-matches.service";

describe("TeamMatchesController", () => {
  let controller: TeamMatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMatchesController],
      providers: [TeamMatchesService],
    }).compile();

    controller = module.get<TeamMatchesController>(TeamMatchesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

import { PartialType } from "@nestjs/swagger";
import { CreateTeamMatchDto } from "./create-team-match.dto";

export class UpdateTeamMatchDto extends PartialType(CreateTeamMatchDto) {}

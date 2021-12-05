import { ApiProperty } from "@nestjs/swagger";
import { Player } from "src/players/entities/player.entity";
import { Season } from "src/seasons/entities/season.entity";
import { TeamMatch } from "src/team-matches/entities/team-match.entity";
import { Training } from "src/training/entities/training.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  myTeam: boolean;

  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: User;

  @ApiProperty()
  players: Player[];

  @ApiProperty()
  trainings: Training[];

  @ApiProperty()
  seasons: Season[];

  @ApiProperty()
  teamMatches: TeamMatch[];
}

export class CreateTeamMatchDto {
  date: Date;
  matchResult: string;
  homeAway: string;
  opponent: string;

  team: number;
  oponentInDatabase: number;
}

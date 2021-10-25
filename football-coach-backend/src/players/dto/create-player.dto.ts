export class CreatePlayerDto {
  firstName: string;

  lastName: string;

  birth: Date;

  preferredFoot: string;

  playerPosition: string;

  team: number;

  playerStatistics: number[];
}

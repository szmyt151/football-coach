import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { Player } from "./entities/player.entity";

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>
  ) {}

  findAll(): Promise<Player[]> {
    return this.playerRepository.find({
      relations: ["team"],
    });
  }

  findOne(id: number): Promise<Player> {
    return this.playerRepository.findOne({
      where: {
        id,
      },
      relations: ["team", "playerStatistics", "trainings"],
    });
  }

  findPlayersByTeam(id: number) {
    return this.playerRepository.find({ where: { teamId: id } });
  }

  async remove(id: number): Promise<void> {
    await this.playerRepository.delete(id);
  }

  async create(createPlayerDto: CreatePlayerDto) {
    const player = this.playerRepository.create(createPlayerDto);
    console.log({ player });
    return await this.playerRepository.save(player);
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    console.log(updatePlayerDto, id);
    await this.playerRepository.update(id, updatePlayerDto);
  }
}

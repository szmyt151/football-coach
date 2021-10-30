import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger: Logger;

  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {
    this.logger = new Logger();
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne(username);
  }

  public findAll(): Promise<User[]> {
    this.logger.log('create something...');
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const user = await this.usersRepository.create(createUserDto);
    this.logger.log('create something...');
    this.logger.log({ user, createUserDto });

    return await this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
  }
}

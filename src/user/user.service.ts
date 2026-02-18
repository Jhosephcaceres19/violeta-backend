import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcript from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async createUser(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    // const salt = bcrypt.genSaltSync(10);

    try {
      return this.usersRepository.save({
        username,
        password: bcript.hashSync(password, 10),
        firstname,
        lastname,
      });
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }
}

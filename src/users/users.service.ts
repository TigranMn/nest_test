import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException();

    return user;
  }

  async createUser(user) {
    this.userRepository.create(user);

    const res = await this.userRepository.save(user);

    return res;
  }

  async deleteUser(id: number) {
    const res = await this.userRepository.delete({ id });

    if (!res.affected) throw new NotFoundException();
    return res;
  }
}

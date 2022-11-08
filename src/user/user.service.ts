import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateBanDto } from './dto/updateBanDto';
import { UpdateRoleDto } from './dto/updateRoleDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    return await this.userRepository.save(userDto);
  }

  async getUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.userRepository.find();
  }

  async updateRole(roleDto: UpdateRoleDto) {
    const { id, role } = roleDto;
    return await this.userRepository.save({ id, role });
  }

  async updateBan(banDto: UpdateBanDto) {
    const { id, ban } = banDto;
    return await this.userRepository.save({ id, ban });
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });
    await this.userRepository.insert(user);
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getAll() {
    return await this.userRepository.find();
  }

  async updateRole(roleDto: UpdateRoleDto) {
    const { id, role } = roleDto;
    const { affected } = await this.userRepository.update(id, { role });

    if (!affected) {
      throw new HttpException("Can't find the user", HttpStatus.NOT_FOUND);
    }

    return { affected };
  }

  async updateBan(banDto: UpdateBanDto) {
    const { id, ban } = banDto;
    const { affected } = await this.userRepository.update(id, { ban });

    if (!affected) {
      throw new HttpException("Can't find the user", HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: number) {
    const { affected } = await this.userRepository.delete(id);

    if (!affected) {
      throw new HttpException("Can't find the user", HttpStatus.NOT_FOUND);
    }
  }
}

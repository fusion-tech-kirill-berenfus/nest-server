import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateBanDto } from './dto/updateBanDto';
import { UpdateRoleDto } from './dto/updateRoleDto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUser(id);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Put('/role')
  async changeRole(@Body('id') roleDto: UpdateRoleDto) {
    return await this.userService.updateRole(roleDto);
  }

  @Put('/ban/:id')
  async setBan(@Body('id') banDto: UpdateBanDto) {
    return await this.userService.updateBan(banDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}

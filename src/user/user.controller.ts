import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateBanDto } from './dto/updateBanDto';
import { UpdateRoleDto } from './dto/updateRoleDto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Put('/role')
  async changeRole(@Body(new ValidationPipe()) updateRoleDto: UpdateRoleDto) {
    return await this.userService.updateRole(updateRoleDto);
  }

  @Put('/ban')
  async setBan(@Body(new ValidationPipe()) updateBanDto: UpdateBanDto) {
    return await this.userService.updateBan(updateBanDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}

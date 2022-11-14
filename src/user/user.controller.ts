import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateBanDto } from './dto/updateBanDto';
import { UpdateRoleDto } from './dto/updateRoleDto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/rolesEnum';
import { RolesGuard } from 'src/guards/roles.guard';
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
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

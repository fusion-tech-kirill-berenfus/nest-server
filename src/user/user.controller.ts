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
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateBanDto } from './dto/update-ban.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/rolesEnum';

@UseGuards(JwtAuthGuard)
@Controller('api/user')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id. [ADMIN]' })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiParam({ name: 'id', description: "User's id" })
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
  @ApiOperation({ summary: 'Get all users. [ADMIN]' })
  @ApiOkResponse({ type: [User] })
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Put('/role')
  @ApiOperation({ summary: "Update user's role state by id. [ADMIN]" })
  @ApiBody({ type: UpdateRoleDto })
  async changeRole(@Body(new ValidationPipe()) updateRoleDto: UpdateRoleDto) {
    return await this.userService.updateRole(updateRoleDto);
  }

  @Put('/ban')
  @ApiOperation({ summary: "Update user's ban state by id. [ADMIN]" })
  @ApiBody({ type: UpdateBanDto })
  async setBan(@Body(new ValidationPipe()) updateBanDto: UpdateBanDto) {
    return await this.userService.updateBan(updateBanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id. [ADMIN]' })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiParam({ name: 'id', description: "User's id" })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}

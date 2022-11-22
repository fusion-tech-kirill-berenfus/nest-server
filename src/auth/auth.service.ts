import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { TokenBodyType, TokenUserInfo } from './types/token-body.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException('Incorrect email', HttpStatus.BAD_REQUEST);
    }

    const isPasswordsAreEqual = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordsAreEqual) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }

    const tokensPair = await this.getTokens(user);

    return tokensPair;
  }

  async logout(res: Response) {
    res.clearCookie('refreshToken');
  }

  async refresh(refresh_token: string) {
    const payload = (await this.jwtService.verifyAsync(
      refresh_token,
    )) as TokenBodyType;

    return await this.getTokens(payload);
  }

  async registerUser(createUserDto: CreateUserDto) {
    const existedUser = await this.userService.getUserByEmail(
      createUserDto.email,
    );

    if (existedUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 5);

    await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  private getTokens(payload: TokenBodyType | User) {
    const userInfo = this.parseTokenBody(payload);

    return Promise.all([
      this.signTokenAsync(userInfo, '10m'),
      this.signTokenAsync(userInfo, '3d'),
    ]);
  }

  private signTokenAsync(userInfo: TokenUserInfo, expiresIn: string) {
    return this.jwtService.signAsync(userInfo, { expiresIn });
  }

  private parseTokenBody(payload: TokenBodyType | User): TokenUserInfo {
    if (payload instanceof User) {
      const { id, role } = payload;
      return { sub: id, role };
    } else {
      const { sub, role } = payload;
      return { sub, role };
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenBodyType, TokenUserInfo } from './types/tokenBodyType';
import { User } from 'src/user/user.entity';

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

    const isPasswordsAreEqual = await compare(
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

    const hashedPassword = await hash(createUserDto.password, 5);

    await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  private getTokens(payload: TokenBodyType | User) {
    const userInfo = this.parseTokenBody(payload);

    return Promise.all([
      this.signTokenAsync(userInfo, '10m'),
      this.signTokenAsync(userInfo, '30m'),
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

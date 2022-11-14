import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenBodyType } from './types/tokenBodyType';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

    const tokensPair = await this.getTokens(user.id);

    return tokensPair;
  }

  async refresh(refresh_token: string) {
    const { sub } = (await this.jwtService.verifyAsync(
      refresh_token,
    )) as TokenBodyType;

    return await this.getTokens(sub);
  }

  async logout(res: Response) {
    res.clearCookie('refreshToken');
  }

  private signTokenAsync(sub: number, expiresIn: string) {
    return this.jwtService.signAsync({ sub }, { expiresIn });
  }

  private getTokens(userId: number) {
    return Promise.all([
      this.signTokenAsync(userId, '10m'),
      this.signTokenAsync(userId, '30m'),
    ]);
  }
}

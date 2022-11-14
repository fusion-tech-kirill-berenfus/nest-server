import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CookieType } from 'src/auth/types/cookieType';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @Post()
  async login(
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
    @Res() res: Response,
  ) {
    const [access_token, refresh_token] = await this.authService.login(
      loginUserDto,
    );

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });
    res.status(HttpStatus.OK).json({ access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refresh_token: refreshToken } = req.cookies as CookieType;

    try {
      const [access_token, refresh_token] = await this.authService.refresh(
        refreshToken,
      );

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
      });
      res.status(HttpStatus.OK).json({ access_token });
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Res() res: Response) {
    this.authService.logout(res);
    res.status(200).send();
  }
}

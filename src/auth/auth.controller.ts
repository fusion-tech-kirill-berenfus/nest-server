import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { CookieType } from './types/cookie.type';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user in the system' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    await this.authService.registerUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Recive access token in body and refresh token in cookie',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
    headers: {
      Set_Cookie: {
        description: 'refresh_roken. Http only. 2 days',
        example: 'asfkakjsfgUGWFIUAgf.IAGSfiugfsaf.BAJKSfbkjASfkb',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Incorrect creeds' })
  @ApiBody({ type: LoginUserDto })
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

  @ApiOperation({
    summary:
      'Recive access token in body and refresh token in cookie after old refresh token validation.',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
    headers: {
      Set_Cookie: {
        description: 'refresh_roken. Http only. 2 days',
        example: 'asfkakjsfgUGWFIUAgf.IAGSfiugfsaf.BAJKSfbkjASfkb',
      },
    },
  })
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

  @ApiOperation({ summary: 'Clear cookie with refresh token' })
  @ApiOkResponse()
  @Post('/logout')
  async logout(@Res() res: Response) {
    this.authService.logout(res);
    res.status(HttpStatus.OK).send();
  }
}

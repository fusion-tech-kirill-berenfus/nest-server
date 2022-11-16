import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: "User's valid email",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'mycoolPassword',
    description: "Unhashed user's password. 4 length min",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly password: string;
}

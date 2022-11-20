import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/enums/rolesEnum';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.test',
    description: "User' unique email",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Username for the system',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: 'Test',
    description: 'Password. MinLegth: 4',
  })
  @IsString()
  @MinLength(4)
  readonly password: string;

  @ApiProperty({
    enum: ['ADMIN', 'USER'],
    description: 'A role of new user',
  })
  @IsEnum(UserRole)
  readonly role: UserRole;
}

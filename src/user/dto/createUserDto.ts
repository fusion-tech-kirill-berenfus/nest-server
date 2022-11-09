import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/enums/rolesEnum';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsEnum(UserRole)
  readonly role?: UserRole;
}

import { UserRole } from 'src/enums/rolesEnum';

export class CreateUserDto {
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly role?: UserRole;
}

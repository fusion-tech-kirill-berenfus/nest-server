import { IsEnum, IsInt } from 'class-validator';
import { UserRole } from 'src/enums/rolesEnum';

export class UpdateRoleDto {
  @IsInt()
  id: number;

  @IsEnum(UserRole)
  role: UserRole;
}

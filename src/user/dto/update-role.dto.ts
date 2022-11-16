import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { UserRole } from 'src/enums/rolesEnum';

export class UpdateRoleDto {
  @ApiProperty({
    example: 0,
    description: 'User id',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    enum: ['ADMIN', 'USER'],
    description: 'A new role for user',
  })
  @IsEnum(UserRole)
  role: UserRole;
}

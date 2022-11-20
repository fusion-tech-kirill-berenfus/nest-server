import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateBanDto {
  @ApiProperty({
    example: 0,
    description: 'User id',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: true,
    description: 'Ban state',
  })
  @IsBoolean()
  ban: boolean;
}

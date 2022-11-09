import { IsBoolean, IsInt } from 'class-validator';

export class UpdateBanDto {
  @IsInt()
  id: number;

  @IsBoolean()
  ban: boolean;
}

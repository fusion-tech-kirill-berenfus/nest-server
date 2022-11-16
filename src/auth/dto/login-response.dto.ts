import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'asfkakjsfgUGWFIUAgf.IAGSfiugfsaf.BAJKSfbkjASfkb',
    description: 'Short-lived token',
  })
  access_token: string;
}

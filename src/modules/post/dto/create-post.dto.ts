import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 1,
    description: "User's id",
  })
  @IsPositive()
  @IsInt()
  authorId: number;

  @ApiProperty({
    example: 'My superpost!',
    description: "Post's title",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a tet string, nothing to look at here',
    description: "Post's content",
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 112,
    description: "Image's id",
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  imageId: number;
}

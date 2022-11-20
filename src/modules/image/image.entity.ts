import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'image' })
export class Image {
  @ApiProperty({ example: 1, description: "Image's id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: "Image's title" })
  @Column()
  imageName: string;

  @ApiProperty({ example: 'bytea', description: "Image's data" })
  @Column({ type: 'bytea' })
  @Exclude()
  imageData: Buffer;

  @ApiProperty({ example: Post, description: "Image's post", type: () => Post })
  @OneToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;
}

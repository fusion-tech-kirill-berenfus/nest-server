import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/modules/user/user.entity';
import { Image } from 'src/modules/image/image.entity';

@Entity({ name: 'post' })
export class Post {
  @ApiProperty({
    example: 1,
    description: "Post's id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Post's very good title",
    description: "Post's title",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Post's very long content...",
    description: "Post's content",
  })
  @Column()
  content: string;

  @ApiProperty({
    example: {
      id: 3,
      imageName: 'png.png',
    },
    description: "Post's image",
  })
  @OneToOne(() => Image, (image) => image.post)
  image: Image;

  @ApiProperty({
    example: {
      id: 17,
      email: 'test4@test.test',
      username: 'Test',
      role: 'USER',
      ban: false,
    },
    description: "Post's user",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}

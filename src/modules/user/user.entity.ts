import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/enums/rolesEnum';
import { Post } from 'src/modules/post/post.entity';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({
    example: 1,
    description: "User's id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'test@test.test',
    description: "User's email",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'tetusername',
    description: 'Username',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: 'Ifjnoif03oNASoif3$oj',
    description: 'Hashed password',
  })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Hashed password',
    enum: UserRole,
  })
  @Column({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({
    example: false,
    description: "User's ban state",
  })
  @Column({ default: false })
  ban: boolean;

  @ApiProperty({
    example: [
      {
        title: 'My second post!!',
        content: 'My. second post with nibba twerk Image!',
        author: {
          id: 17,
          email: 'test4@test.test',
          username: 'Test',
          role: 'USER',
          ban: false,
        },
        image: {
          id: 3,
          imageName: 'png.png',
          post: null,
        },
        id: 18,
      },
    ],
    description: "User's posts",
  })
  @OneToMany(() => Post, (post) => post.author)
  posts: [Post];
}

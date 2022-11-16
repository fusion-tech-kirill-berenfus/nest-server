import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/enums/rolesEnum';

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
}

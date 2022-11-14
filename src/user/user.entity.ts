import { UserRole } from 'src/enums/rolesEnum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: false })
  ban: boolean;
}

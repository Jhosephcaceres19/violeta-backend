import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './UserRole';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  isActive: boolean;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole;
}

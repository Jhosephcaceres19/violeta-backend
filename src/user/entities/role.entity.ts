import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './UserRole';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  description: UserRole;

  @Column()
  level: number;
}

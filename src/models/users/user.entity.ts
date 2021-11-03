import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  OneToMany,
} from 'typeorm';
import { Role } from '../roles/role';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    unique: true,
  })
  email: string;

  @Check('char_length(password) > 6')
  @Column('varchar', { nullable: false, length: 128 })
  password: string;

  @Column('varchar', { length: 35, nullable: false })
  firstName: string;

  @Column('varchar', { length: 35, nullable: false })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  isAdmin: boolean;

  @OneToMany(() => Role, (role) => role.user, { eager: true })
  roles: Role[];
}

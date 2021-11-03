import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role';
import { Translation } from '../translations/translation';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Translation)
  @JoinTable({
    name: 't_restaurant_descriptions',
    joinColumn: {
      name: 'restaurant',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'translation',
      referencedColumnName: 'id',
    },
  })
  description: string;

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];
}

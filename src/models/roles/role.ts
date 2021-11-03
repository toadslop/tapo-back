import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';
import { User } from '../users/user.entity';

export enum Roles {
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  GUEST = 'guest',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.roles)
  restaurant: Restaurant;

  @Column({ type: 'enum', enum: Roles, default: Roles.GUEST })
  roleName: string;
}

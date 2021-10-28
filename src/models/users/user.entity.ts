import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';

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
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ISO6391 from 'iso-639-1';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ISO6391.getAllCodes(),
    default: ISO6391.getCode('English'),
    nullable: false,
  })
  lang: string;

  @Column({ type: 'text', nullable: false })
  value: string;
}

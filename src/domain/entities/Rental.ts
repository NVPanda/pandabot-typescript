import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './Group';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  groupId: string;

  @ManyToOne(() => Group)
  group: Group;

  @Column()
  durationHours: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;
}
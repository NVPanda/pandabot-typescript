import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auto_responder')
export class AutoResponder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trigger: string;

  @Column('text')
  response: string;

  @Column({ default: true })
  active: boolean;
}
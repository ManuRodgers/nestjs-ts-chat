import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Position } from '../interfaces/index';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  text: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  combinedId: string;

  @Column()
  position: Position;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: number;
}

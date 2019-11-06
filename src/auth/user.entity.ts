import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Kind } from '../interfaces/';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  kind: Kind;

  // boss
  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  money?: string;

  @Column({ nullable: true })
  description?: string;

  // genius
  @Column({ nullable: true })
  job?: string;

  @Column({ nullable: true })
  salary?: string;

  @Column({ nullable: true })
  profile?: string;

  // relations

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashedPassword;
  }
}

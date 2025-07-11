import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACTIVATED', 'COMPLETED'],
    default: 'PENDING',
  })
  status: string;

  @Column({ nullable: true })
  activationCode?: string;

  @Column({ nullable: true })
  activationCodeExpiresAt?: Date;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({ nullable: true })
  loginCode?: string;

  @Column({ nullable: true })
  loginCodeExpiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

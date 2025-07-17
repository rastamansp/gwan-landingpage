import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('characters')
export class CharacterEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'json', nullable: true })
  analysis: any;

  @Column({ nullable: true })
  characterName: string;

  @Column({ nullable: true })
  characterAge: string;

  @Column({ nullable: true })
  characterGender: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

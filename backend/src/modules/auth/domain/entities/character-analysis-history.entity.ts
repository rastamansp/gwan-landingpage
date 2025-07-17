import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AnalysisStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Entity('character_analysis_history')
export class CharacterAnalysisHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'character_id', type: 'varchar' })
  characterId: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'json', nullable: true })
  analysis: any;

  @Column({
    type: 'enum',
    enum: AnalysisStatus,
    default: AnalysisStatus.SUCCESS,
  })
  status: AnalysisStatus;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string;

  @Column({ name: 'openai_response', type: 'json', nullable: true })
  openaiResponse: any;

  @Column({ type: 'json', nullable: true })
  metadata: any;

  @CreateDateColumn({ name: 'processed_at' })
  processedAt: Date;
}

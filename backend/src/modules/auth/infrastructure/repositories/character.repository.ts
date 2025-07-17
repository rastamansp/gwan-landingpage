import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../../domain/entities/character.entity';
import { ICharacterRepository } from '../../domain/repositories/character-repository.interface';
import { CharacterEntity } from '../entities/character.entity';
import { CharacterAnalysisHistoryEntity } from '../../domain/entities/character-analysis-history.entity';

@Injectable()
export class CharacterRepository implements ICharacterRepository {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    @InjectRepository(CharacterAnalysisHistoryEntity)
    private readonly analysisHistoryRepository: Repository<CharacterAnalysisHistoryEntity>
  ) {}

  async save(character: Character): Promise<void> {
    const entity = this.mapToEntity(character);
    await this.characterRepository.save(entity);
  }

  async findByUserId(userId: string): Promise<Character | null> {
    const entity = await this.characterRepository.findOne({
      where: { userId },
    });

    if (!entity) {
      return null;
    }

    return this.mapToDomain(entity);
  }

  async update(character: Character): Promise<void> {
    const entity = this.mapToEntity(character);
    await this.characterRepository.save(entity);
  }

  async saveAnalysisHistory(
    history: Partial<CharacterAnalysisHistoryEntity>
  ): Promise<void> {
    await this.analysisHistoryRepository.save(history);
  }

  private mapToEntity(character: Character): CharacterEntity {
    const entity = new CharacterEntity();
    entity.id = character.getId();
    entity.userId = character.getUserId();
    entity.imageUrl = character.getImageUrl();
    entity.createdAt = character.getCreatedAt();
    entity.updatedAt = character.getUpdatedAt();
    entity.analysis = character.getAnalysis();
    entity.characterName = character.getCharacterName();
    entity.characterAge = character.getCharacterAge();
    entity.characterGender = character.getCharacterGender();
    return entity;
  }

  private mapToDomain(entity: CharacterEntity): Character {
    return new Character(
      entity.id,
      entity.userId,
      entity.imageUrl,
      entity.createdAt,
      entity.updatedAt,
      entity.analysis,
      entity.characterName,
      entity.characterAge,
      entity.characterGender
    );
  }
}

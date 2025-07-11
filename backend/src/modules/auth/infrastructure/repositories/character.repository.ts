import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../../domain/entities/character.entity';
import { ICharacterRepository } from '../../domain/repositories/character-repository.interface';
import { CharacterEntity } from '../entities/character.entity';

@Injectable()
export class CharacterRepository implements ICharacterRepository {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>
  ) {}

  async save(character: Character): Promise<void> {
    const entity = new CharacterEntity();
    entity.id = character.getId();
    entity.userId = character.getUserId();
    entity.imageUrl = character.getImageUrl();
    entity.createdAt = character.getCreatedAt();
    entity.updatedAt = character.getUpdatedAt();

    await this.characterRepository.save(entity);
  }

  async findByUserId(userId: string): Promise<Character | null> {
    const entity = await this.characterRepository.findOne({
      where: { userId },
    });

    if (!entity) {
      return null;
    }

    return new Character(
      entity.id,
      entity.userId,
      entity.imageUrl,
      entity.createdAt,
      entity.updatedAt
    );
  }

  async update(character: Character): Promise<void> {
    const entity = new CharacterEntity();
    entity.id = character.getId();
    entity.userId = character.getUserId();
    entity.imageUrl = character.getImageUrl();
    entity.createdAt = character.getCreatedAt();
    entity.updatedAt = character.getUpdatedAt();

    await this.characterRepository.save(entity);
  }
}

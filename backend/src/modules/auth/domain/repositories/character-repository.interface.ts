import { Character } from '../entities/character.entity';

export interface ICharacterRepository {
  save(character: Character): Promise<void>;
  findByUserId(userId: string): Promise<Character | null>;
  update(character: Character): Promise<void>;
}

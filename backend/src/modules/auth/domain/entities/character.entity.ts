export class Character {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly imageUrl: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly analysis?: any,
    private readonly characterName?: string,
    private readonly characterAge?: string,
    private readonly characterGender?: string
  ) {}

  // Getters
  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getAnalysis(): any {
    return this.analysis;
  }

  getCharacterName(): string | undefined {
    return this.characterName;
  }

  getCharacterAge(): string | undefined {
    return this.characterAge;
  }

  getCharacterGender(): string | undefined {
    return this.characterGender;
  }

  // Método para atualizar a imagem do personagem
  updateImage(newImageUrl: string): Character {
    return new Character(
      this.id,
      this.userId,
      newImageUrl,
      this.createdAt,
      new Date(),
      this.analysis,
      this.characterName,
      this.characterAge,
      this.characterGender
    );
  }

  // Método para atualizar análise
  updateAnalysis(
    analysis: any,
    characterName?: string,
    characterAge?: string,
    characterGender?: string
  ): Character {
    return new Character(
      this.id,
      this.userId,
      this.imageUrl,
      this.createdAt,
      new Date(),
      analysis,
      characterName,
      characterAge,
      characterGender
    );
  }

  // Método para criar um novo personagem
  static create(userId: string, imageUrl: string): Character {
    const id = `character_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();
    return new Character(id, userId, imageUrl, now, now);
  }
}

export class Character {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly imageUrl: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
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

  // Método para atualizar a imagem do personagem
  updateImage(newImageUrl: string): Character {
    return new Character(
      this.id,
      this.userId,
      newImageUrl,
      this.createdAt,
      new Date()
    );
  }

  // Método para criar um novo personagem
  static create(userId: string, imageUrl: string): Character {
    const id = `character_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();
    return new Character(id, userId, imageUrl, now, now);
  }
}

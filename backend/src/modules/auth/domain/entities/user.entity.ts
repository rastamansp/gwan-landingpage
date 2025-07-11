export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVATED = 'ACTIVATED',
  COMPLETED = 'COMPLETED',
}

export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly phone: string,
    private status: UserStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private activationCode?: string,
    private activationCodeExpiresAt?: Date,
    private profileImageUrl?: string,
    private loginCode?: string,
    private loginCodeExpiresAt?: Date
  ) {
    this.validateEmail(email);
    this.validatePhone(phone);
    this.validateName(name);
  }

  // Validações de domínio
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validatePhone(phone: string): void {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone format');
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
  }

  // Métodos de negócio
  generateActivationCode(): void {
    this.activationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    this.activationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    this.updatedAt = new Date();
  }

  activate(code: string): boolean {
    if (!this.activationCode || !this.activationCodeExpiresAt) {
      throw new Error('No activation code found');
    }

    if (this.activationCodeExpiresAt < new Date()) {
      throw new Error('Activation code expired');
    }

    if (this.activationCode !== code) {
      throw new Error('Invalid activation code');
    }

    this.status = UserStatus.ACTIVATED;
    this.activationCode = undefined;
    this.activationCodeExpiresAt = undefined;
    this.updatedAt = new Date();
    return true;
  }

  completeProfile(imageUrl: string): void {
    if (this.status !== UserStatus.ACTIVATED) {
      throw new Error('User must be activated before completing profile');
    }

    this.profileImageUrl = imageUrl;
    this.status = UserStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  // Métodos de login
  setLoginCode(loginCode: string): void {
    this.loginCode = loginCode;
    this.updatedAt = new Date();
  }

  setLoginCodeExpiresAt(expiresAt: Date): void {
    this.loginCodeExpiresAt = expiresAt;
    this.updatedAt = new Date();
  }

  getLoginCode(): string | undefined {
    return this.loginCode;
  }

  getLoginCodeExpiresAt(): Date | undefined {
    return this.loginCodeExpiresAt;
  }

  clearLoginCode(): void {
    this.loginCode = undefined;
    this.loginCodeExpiresAt = undefined;
    this.updatedAt = new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getPhone(): string {
    return this.phone;
  }
  getStatus(): UserStatus {
    return this.status;
  }
  getActivationCode(): string | undefined {
    return this.activationCode;
  }
  getActivationCodeExpiresAt(): Date | undefined {
    return this.activationCodeExpiresAt;
  }
  getProfileImageUrl(): string | undefined {
    return this.profileImageUrl;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Métodos para serialização
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      status: this.status,
      profileImageUrl: this.profileImageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

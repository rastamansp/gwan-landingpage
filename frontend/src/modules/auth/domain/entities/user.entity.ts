export enum UserStatus {
    PENDING = 'PENDING',
    ACTIVATED = 'ACTIVATED',
    COMPLETED = 'COMPLETED'
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
        private profileImageUrl?: string
    ) { }

    // Getters
    getId(): string { return this.id; }
    getName(): string { return this.name; }
    getEmail(): string { return this.email; }
    getPhone(): string { return this.phone; }
    getStatus(): UserStatus { return this.status; }
    getProfileImageUrl(): string | undefined { return this.profileImageUrl; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }

    // Métodos de negócio
    isPending(): boolean {
        return this.status === UserStatus.PENDING;
    }

    isActivated(): boolean {
        return this.status === UserStatus.ACTIVATED;
    }

    isCompleted(): boolean {
        return this.status === UserStatus.COMPLETED;
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
            updatedAt: this.updatedAt
        };
    }

    static fromJSON(data: any): User {
        return new User(
            data.id,
            data.name,
            data.email,
            data.phone,
            data.status as UserStatus,
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.profileImageUrl
        );
    }
} 
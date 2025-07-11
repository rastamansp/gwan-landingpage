import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async save(user: User): Promise<void> {
    const userEntity = this.mapToEntity(user);
    await this.repository.save(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { email } });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { phone } });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async findByContact(contact: string): Promise<User | null> {
    // Verifica se é email ou telefone
    const isEmail = contact.includes('@');

    if (isEmail) {
      return this.findByEmail(contact);
    } else {
      return this.findByPhone(contact);
    }
  }

  async update(user: User): Promise<void> {
    const userEntity = this.mapToEntity(user);
    await this.repository.save(userEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private mapToEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.getId();
    entity.name = user.getName();
    entity.email = user.getEmail();
    entity.phone = user.getPhone();
    entity.status = user.getStatus();
    entity.activationCode = user.getActivationCode();
    entity.activationCodeExpiresAt = user.getActivationCodeExpiresAt();
    entity.profileImageUrl = user.getProfileImageUrl();
    entity.loginCode = user.getLoginCode();
    entity.loginCodeExpiresAt = user.getLoginCodeExpiresAt();
    entity.createdAt = user.getCreatedAt();
    entity.updatedAt = user.getUpdatedAt();
    return entity;
  }

  private mapToDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.phone,
      entity.status as UserStatus,
      entity.createdAt,
      entity.updatedAt,
      entity.activationCode,
      entity.activationCodeExpiresAt,
      entity.profileImageUrl,
      entity.loginCode,
      entity.loginCodeExpiresAt
    );
  }
}

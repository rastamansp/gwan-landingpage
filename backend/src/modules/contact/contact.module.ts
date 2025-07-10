import { Module } from '@nestjs/common';
import { ContactController } from './presentation/contact.controller';

@Module({
  controllers: [ContactController],
})
export class ContactModule {}

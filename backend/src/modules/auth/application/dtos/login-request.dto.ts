import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Contato é obrigatório' })
  contact: string;
}

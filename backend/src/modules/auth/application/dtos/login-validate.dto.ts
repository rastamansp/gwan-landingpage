import { IsString, IsNotEmpty, Length } from 'class-validator';

export class LoginValidateDto {
  @IsString()
  @IsNotEmpty({ message: 'Contato é obrigatório' })
  contact: string;

  @IsString()
  @IsNotEmpty({ message: 'Código de login é obrigatório' })
  @Length(6, 6, { message: 'Código de login deve ter 6 dígitos' })
  loginCode: string;
}

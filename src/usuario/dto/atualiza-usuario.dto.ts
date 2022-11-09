import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { UsuarioEntity } from '../usuario.entity';
import { IsEmailUnique } from '../validacoes/is-email-unique.validator';

export class AtualizaUsuarioDTO {
  @IsUUID(undefined, { message: 'ID inválido' })
  id: string;

  @IsEmail(undefined, { message: 'E-mail inválido' })
  @IsEmailUnique({ message: 'E-mail já cadastrado' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Senha não pode ser vazio' })
  @MinLength(6, { message: 'A senha precisa ter mais que 6 caracteres' })
  @IsOptional()
  senha?: string;

  toEntity(): UsuarioEntity {
    const usuario = new UsuarioEntity();
    usuario.email = this.email;
    usuario.senha = this.senha;
    return usuario;
  }
}

import { IsEmail, IsString, MinLength } from 'class-validator';
import { UsuarioEntity } from '../usuario.entity';
import { IsEmailUnique } from '../validacoes/is-email-unique.validator';

export class CriaUsuarioDTO {
  @IsEmail({ message: 'E-mail inválido' })
  @IsEmailUnique({ message: 'E-mail já cadastrado' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha precisa ter mais que 6 caracteres' })
  senha: string;

  toEntity(): UsuarioEntity {
    const usuario = new UsuarioEntity();
    usuario.email = this.email;
    usuario.senha = this.senha;

    return usuario;
  }
}

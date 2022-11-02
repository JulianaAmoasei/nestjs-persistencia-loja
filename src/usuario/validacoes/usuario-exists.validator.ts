import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';

@Injectable()
export class UsuarioExists implements PipeTransform {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  transform(id: string) {
    const usuario = this.usuarioRepository.buscaPorId(id);
    if (!usuario) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: ['Usuário não existe'],
      });
    }

    return id;
  }
}

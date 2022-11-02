import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  existeComId(id: string) {
    return this.usuarioRepository.buscaPorId(id) !== null;
  }
}

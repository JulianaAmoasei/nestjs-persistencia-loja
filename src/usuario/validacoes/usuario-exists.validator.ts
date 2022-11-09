import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario.entity';

@Injectable()
export class UsuarioExists implements PipeTransform {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async transform(id: string) {
    const usuarios = await this.usuarioRepository.findAndCountBy({ id });
    if (!usuarios.length) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: ['Usuário não existe'],
      });
    }

    return id;
  }
}

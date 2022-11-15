import {
  HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { UsuarioService } from '../usuario.service';

@Injectable()
export class UsuarioExists implements PipeTransform {
  constructor(private readonly usuarioService: UsuarioService) {}

  async transform(id: string) {
    const usuarioExiste = await this.usuarioService.existeComId(id);
    if (!usuarioExiste) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: ['Usuário não existe'],
      });
    }

    return id;
  }
}

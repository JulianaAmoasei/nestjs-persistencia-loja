import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { UsuarioService } from '../../usuario/usuario.service';
import { AtualizaProdutoDTO } from '../dto/atualiza-produto.dto';
import { DeletaProdutoDTO } from '../dto/deleta-produto.dto';
import { ProdutoRepository } from '../produto.repository';

@Injectable()
export class ProdutoDoUsuario implements PipeTransform {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  transform(dadosProduto: AtualizaProdutoDTO | DeletaProdutoDTO) {
    const usuarioExiste = this.usuarioService.existeComId(
      dadosProduto.usuarioId,
    );

    if (!usuarioExiste) {
      throw new BadRequestException({
        error: 'Bad Request',
        message: 'Usuário informado para o produto não existe',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const possivelProduto = this.produtoRepository.buscaPorId(dadosProduto.id);

    if (possivelProduto.usuarioId !== dadosProduto.usuarioId) {
      throw new ForbiddenException({
        error: 'Forbidden',
        message: 'Produto não pode ser alterado pelo usuário informado',
        status: HttpStatus.FORBIDDEN,
      });
    }

    return dadosProduto;
  }
}

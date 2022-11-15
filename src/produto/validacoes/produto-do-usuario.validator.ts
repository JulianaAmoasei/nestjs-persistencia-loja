import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsuarioService } from '../../usuario/usuario.service';
import { AtualizaProdutoDTO } from '../dto/atualiza-produto.dto';
import { DeletaProdutoDTO } from '../dto/deleta-produto.dto';
import { ProdutoEntity } from '../produto.entity';
import { ProdutoService } from '../produto.service';

@Injectable()
export class ProdutoDoUsuario implements PipeTransform {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly produtoService: ProdutoService,
  ) {}

  async transform(dadosProduto: AtualizaProdutoDTO | DeletaProdutoDTO) {
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

    const possivelProduto = await this.produtoService.buscaComId(
      dadosProduto.id,
    );

    if (possivelProduto.usuario.id !== dadosProduto.usuarioId) {
      throw new ForbiddenException({
        error: 'Forbidden',
        message: 'Produto não pode ser alterado pelo usuário informado',
        status: HttpStatus.FORBIDDEN,
      });
    }

    return dadosProduto;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AtualizaProdutoDTO } from './dto/atualiza-produto.dto';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { DeletaProdutoDTO } from './dto/deleta-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoDoUsuario } from './validacoes/produto-do-usuario.validator';
import { ProdutoExists } from './validacoes/produto-exists.validator';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @Get()
  listaTodos() {
    return this.produtoRepository.listaTodos();
  }

  @Post()
  criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = this.produtoRepository.salva(dadosProduto);
    return produtoCadastrado;
  }

  @Put('/:id')
  atualiza(
    @Param('id', ProdutoExists) id: string,
    @Body(ProdutoDoUsuario) dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = this.produtoRepository.atualiza(dadosProduto);
    return produtoAlterado;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ProdutoExists) id: string,
    @Body(ProdutoDoUsuario) dadosUsuario: DeletaProdutoDTO,
  ) {
    this.produtoRepository.remove(id);
  }
}

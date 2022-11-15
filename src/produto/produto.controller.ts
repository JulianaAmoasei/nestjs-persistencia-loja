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
import { ProdutoService } from './produto.service';

import { ProdutoDoUsuario } from './validacoes/produto-do-usuario.validator';
import { ProdutoExists } from './validacoes/produto-exists.validator';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async listaTodos() {
    const produtos = await this.produtoService.listaTodos();
    return produtos;
  }

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCriado = await this.produtoService.criaNovo(dadosProduto);
    return produtoCriado;
  }

  @Put('/:id')
  async atualiza(
    @Param('id', ProdutoExists) id: string,
    @Body(ProdutoDoUsuario) dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtoService.atualiza(
      id,
      dadosProduto,
    );

    return produtoAtualizado;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ProdutoExists) id: string) {
    await this.produtoService.removeComId(id);
  }
}

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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AtualizaProdutoDTO } from './dto/atualiza-produto.dto';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoEntity } from './produto.entity';

import { ProdutoDoUsuario } from './validacoes/produto-do-usuario.validator';
import { ProdutoExists } from './validacoes/produto-exists.validator';

@Controller('produtos')
export class ProdutoController {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    @InjectRepository(ProdutoImagemEntity)
    private readonly produtoImagensRepository: Repository<ProdutoImagemEntity>,
    @InjectRepository(ProdutoCaracteristicaEntity)
    private readonly produtoCaracteristicasRepository: Repository<ProdutoCaracteristicaEntity>,
  ) {}

  @Get()
  async listaTodos() {
    return this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
  }

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const novoProduto = dadosProduto.toEntity();
    const produtoCadastrado = await this.produtoRepository.save(novoProduto);
    return produtoCadastrado;
  }

  @Put('/:id')
  async atualiza(
    @Param('id', ProdutoExists) id: string,
    @Body(ProdutoDoUsuario) dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoParaAtualizar = dadosProduto.toEntity();
    await this.produtoRepository.save(produtoParaAtualizar);
    const produtoAlterado = await this.produtoRepository.findOneBy({ id });
    return produtoAlterado;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ProdutoExists) id: string) {
    const produto = await this.produtoRepository.findOne({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
      where: { id },
    });
    await this.produtoCaracteristicasRepository.remove(produto.caracteristicas);
    await this.produtoImagensRepository.remove(produto.imagens);
    await this.produtoRepository.remove(produto);
  }
}

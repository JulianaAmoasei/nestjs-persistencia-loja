import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/atualiza-produto.dto';
import {
  CaracteristicaProdutoDTO,
  CriaProdutoDTO,
  ImagemProdutoDTO,
} from './dto/cria-produto.dto';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoEntity } from './produto.entity';

export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaNovo(dadosProduto: CriaProdutoDTO) {
    const novoProduto = this.mapToEntity(dadosProduto);
    const produtoCadastrado = await this.produtoRepository.save(novoProduto);
    return produtoCadastrado;
  }

  async atualiza(id, dadosProduto: AtualizaProdutoDTO) {
    const produtoParaAtualizar = this.mapToEntity(dadosProduto);
    await this.produtoRepository.save(produtoParaAtualizar);
    const produtoAlterado = await this.produtoRepository.findOneBy({ id });
    return produtoAlterado;
  }

  async buscaComId(id: string) {
    const produto = await this.produtoRepository.findOne({
      relations: {
        usuario: true,
        imagens: true,
        caracteristicas: true,
      },
      where: { id },
    });

    return produto;
  }

  async listaTodos() {
    const produtos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });

    return produtos;
  }

  async removeComId(id: string) {
    const produto = await this.produtoRepository.findOne({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
      where: { id },
    });

    await this.produtoRepository.manager.transaction(async (manager) => {
      await manager.remove(produto.imagens);
      await manager.remove(produto.caracteristicas);
      await manager.remove(produto);
    });
  }

  private mapToEntity(
    dadosProduto: CriaProdutoDTO | AtualizaProdutoDTO,
  ): ProdutoEntity {
    const produtoId =
      dadosProduto instanceof AtualizaProdutoDTO ? dadosProduto.id : undefined;

    const usuario = new UsuarioEntity();
    usuario.id = dadosProduto.usuarioId;

    const produto = new ProdutoEntity();
    produto.id = produtoId;
    produto.nome = dadosProduto.nome;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.quantidade = dadosProduto.quantidade;
    produto.valor = dadosProduto.valor;
    produto.imagens = dadosProduto.imagens.map(this.mapProdutoImageToEntity);

    produto.caracteristicas = dadosProduto.caracteristicas.map(
      this.mapProdutoCaracteristicaToEntity,
    );

    produto.usuario = usuario;
    return produto;
  }

  private mapProdutoImageToEntity(
    imagemProduto: ImagemProdutoDTO,
  ): ProdutoImagemEntity {
    const entidade = new ProdutoImagemEntity();
    entidade.url = imagemProduto.url;
    entidade.descricao = imagemProduto.descricao;
    return entidade;
  }

  private mapProdutoCaracteristicaToEntity(
    produtoCaracteristica: CaracteristicaProdutoDTO,
  ): ProdutoCaracteristicaEntity {
    const entidade = new ProdutoCaracteristicaEntity();
    entidade.nome = produtoCaracteristica.nome;
    entidade.descricao = produtoCaracteristica.descricao;
    return entidade;
  }
}

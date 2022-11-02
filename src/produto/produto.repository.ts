import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/atualiza-produto.dto';

@Injectable()
export class ProdutoRepository {
  private produtos = [
    {
      id: 'fb0a90ac-d6d8-41cc-a8d6-c42abd306bf8',
      usuarioId: 'b3c15536-07cd-4d32-8a8f-f30b13f8efee',
      nome: 'Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic',
      valor: 70.0,
      quantidadeDisponivel: 10,
      descricao: 'Produto novo, bem acabado, alegria para colecionadores',
      caracteristicas: [{ fabricante: 'Iron Studios', material: 'Plástico' }],
      imagens: [
        {
          url: 'https://i.imgur.com/dwDZICq.jpg',
          descricao: 'Imagem do Homem Aranha',
        },
      ],
      categoria: 'Colecionáveis',
      dataCriacao: new Date(),
      dataAtualizacao: null,
    },

    {
      id: '52ed4104-e9f7-41dd-b5b5-f5717c995430',
      usuarioId: '372a0d79-e7c3-4993-baec-23f0db6d6e2d',
      nome: 'Figura de ação Marvel Thanos Titan Hero Deluxe E7381 de Hasbro Avengers',
      valor: 89.9,
      quantidadeDisponivel: 22,
      descricao: 'Produto novo, bem acabado, alegria para fans da Marvel',
      caracteristicas: [{ fabricante: 'Iron Studios', material: 'Plástico' }],
      imagens: [
        {
          url: 'https://i.imgur.com/3bF1Gav.jpg',
          descricao: 'Imagem do Thanos',
        },
      ],
      categoria: 'Colecionáveis',
      dataCriacao: new Date(),
      dataAtualizacao: null,
    },
    {
      id: 'ba42508f-3848-4f4b-bca5-dbfdabef891d',
      usuarioId: '372a0d79-e7c3-4993-baec-23f0db6d6e2d',
      nome: 'Figura de ação Marvel Capitão América Avengers F1342 de Hasbro Titan Hero Series',
      valor: 79.9,
      quantidadeDisponivel: 19,
      descricao: 'Produto novo, bem acabado, alegria para fans da Marvel',
      caracteristicas: [{ fabricante: 'Iron Studios', material: 'Plástico' }],
      imagens: [
        {
          url: 'https://i.imgur.com/fG2JlwV.jpg',
          descricao: 'Imagem do Capitão América',
        },
      ],
      categoria: 'Colecionáveis',
      dataCriacao: new Date(),
      dataAtualizacao: null,
    },
  ];

  listaTodos() {
    return this.produtos;
  }

  salva(dadosProduto) {
    const produtoCadastrado = {
      id: randomUUID(),
      ...dadosProduto,
      dataCriacao: new Date(),
      dataAtualizacao: null,
    };
    this.produtos.push(produtoCadastrado);
    return produtoCadastrado;
  }

  buscaPorId(id: string) {
    return this.produtos.find((produto) => produto.id === id) || null;
  }

  atualiza(dadosProduto: AtualizaProdutoDTO) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const produto = this.buscaPorId(dadosProduto.id);
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
    });

    produto.dataAtualizacao = new Date();

    return produto;
  }

  remove(id: string) {
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    return this.produtos;
  }
}

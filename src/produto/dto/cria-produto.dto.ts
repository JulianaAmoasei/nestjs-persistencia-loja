import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ProdutoCaracteristicaEntity } from '../produto-caracteristica.entity';
import { ProdutoImagemEntity } from '../produto-imagem.entity';
import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;

  toEntity(): ProdutoCaracteristicaEntity {
    const produtoCaracteristica = new ProdutoCaracteristicaEntity();
    produtoCaracteristica.nome = this.nome;
    produtoCaracteristica.descricao = this.descricao;
    return produtoCaracteristica;
  }
}

export class ImagemProdutoDTO {
  @IsUrl({ message: 'URL para imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  toEntity(): ProdutoImagemEntity {
    const produtoImagem = new ProdutoImagemEntity();
    produtoImagem.url = this.url;
    produtoImagem.descricao = this.descricao;

    return produtoImagem;
  }
}

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;

  toEntity(): ProdutoEntity {
    const usuario = new UsuarioEntity();
    usuario.id = this.usuarioId;

    const produto = new ProdutoEntity();
    produto.nome = this.nome;
    produto.descricao = this.descricao;
    produto.categoria = this.categoria;
    produto.quantidade = this.quantidade;
    produto.valor = this.valor;
    produto.usuario = usuario;
    produto.imagens = this.imagens.map((imagem) => imagem.toEntity());

    produto.caracteristicas = this.caracteristicas.map((caracteristica) =>
      caracteristica.toEntity(),
    );

    return produto;
  }
}

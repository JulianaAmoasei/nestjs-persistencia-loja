import {
  HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ProdutoRepository } from '../produto.repository';

@Injectable()
export class ProdutoExists implements PipeTransform {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  transform(id: string) {
    const possivelProduto = this.produtoRepository.buscaPorId(id);
    if (!possivelProduto) {
      throw new NotFoundException({
        message: 'Produto não encontrado',
        status: HttpStatus.NOT_FOUND,
        error: 'Not Found',
      });
    }

    return id;
  }
}

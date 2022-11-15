import {
  HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ProdutoService } from '../produto.service';

@Injectable()
export class ProdutoExists implements PipeTransform {
  constructor(private readonly produtoService: ProdutoService) {}

  async transform(id: string) {
    const possivelProduto = await this.produtoService.buscaComId(id);
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

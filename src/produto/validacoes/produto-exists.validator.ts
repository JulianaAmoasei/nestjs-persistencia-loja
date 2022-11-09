import {
  HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntity } from '../produto.entity';

@Injectable()
export class ProdutoExists implements PipeTransform {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async transform(id: string) {
    const possivelProduto = await this.produtoRepository.findOneBy({ id });
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

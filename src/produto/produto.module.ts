import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoDoUsuario } from './validacoes/produto-do-usuario.validator';
import { ProdutoExists } from './validacoes/produto-exists.validator';

@Module({
  imports: [
    UsuarioModule,
    TypeOrmModule.forFeature([
      ProdutoEntity,
      ProdutoImagemEntity,
      ProdutoCaracteristicaEntity,
    ]),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoDoUsuario, ProdutoExists, ProdutoService],
})
export class ProdutoModule {}

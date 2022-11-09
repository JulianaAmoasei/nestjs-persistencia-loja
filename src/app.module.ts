import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './infra/datasource';
import { ProdutoCaracteristicaEntity } from './produto/produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto/produto-imagem.entity';
import { ProdutoEntity } from './produto/produto.entity';

import { ProdutoModule } from './produto/produto.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...datasourceOptions,
      entities: [
        UsuarioEntity,
        ProdutoEntity,
        ProdutoImagemEntity,
        ProdutoCaracteristicaEntity,
      ],
    }),
    UsuarioModule,
    ProdutoModule,
  ],
})
export class AppModule {}

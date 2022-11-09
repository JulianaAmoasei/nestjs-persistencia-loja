import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { EmailEhUnicoConstraint } from './validacoes/is-email-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [EmailEhUnicoConstraint, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}

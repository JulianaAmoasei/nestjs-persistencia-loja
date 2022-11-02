import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';
import { EmailEhUnicoConstraint } from './validacoes/is-email-unique.validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailEhUnicoConstraint, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}

import { Repository } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { UsuarioExists } from './validacoes/usuario-exists.validator';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  @Get()
  async listaTodos(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((usuario) => {
      return new ListaUsuarioDTO(
        usuario.id,
        usuario.email,
        usuario.dataCriacao,
      );
    });
  }

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const novoUsuario = dadosUsuario.toEntity();
    const usuarioCriado = await this.usuarioRepository.save(novoUsuario);
    return new ListaUsuarioDTO(
      usuarioCriado.id,
      usuarioCriado.email,
      usuarioCriado.dataCriacao,
    );
  }

  @Put('/:id')
  async editaUsuario(
    @Param('id', UsuarioExists) id,
    @Body() dadosUsuario: AtualizaUsuarioDTO,
  ) {
    const usuarioParaAtualizar = dadosUsuario.toEntity();
    await this.usuarioRepository.update({ id: id }, usuarioParaAtualizar);
    const usuarioAtualizado = await this.usuarioRepository.findOne({
      where: { id },
    });

    return new ListaUsuarioDTO(
      usuarioAtualizado.id,
      usuarioAtualizado.email,
      usuarioAtualizado.dataAtualizacao,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUsuario(@Param('id', UsuarioExists) id: string) {
    await this.usuarioRepository.delete({ id });
  }
}

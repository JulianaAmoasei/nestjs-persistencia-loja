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
import { UsuarioRepository } from './usuario.repository';
import { UsuarioExists } from './validacoes/usuario-exists.validator';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  @Get()
  listaTodos(): ListaUsuarioDTO[] {
    return this.usuarioRepository.listaTodos().map((usuario) => {
      const listaUsuario = new ListaUsuarioDTO();
      listaUsuario.dataCriacao = usuario.dataCriacao;
      listaUsuario.email = usuario.email;
      listaUsuario.id = usuario.id;
      listaUsuario.dataAtualizacao = usuario.dataAtualizacao;
      return listaUsuario;
    });
  }

  @Post()
  criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioCriado = this.usuarioRepository.salva(dadosUsuario);
    return usuarioCriado;
  }

  @Put('/:id')
  editaUsuario(
    @Param('id', UsuarioExists) id,
    @Body() dadosUsuario: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = this.usuarioRepository.atualiza(id, dadosUsuario);
    const listaUsuario = new ListaUsuarioDTO();
    listaUsuario.dataCriacao = usuarioAtualizado.dataCriacao;
    listaUsuario.email = usuarioAtualizado.email;
    listaUsuario.id = usuarioAtualizado.id;
    listaUsuario.dataAtualizacao = usuarioAtualizado.dataAtualizacao;
    return listaUsuario;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUsuario(@Param('id', UsuarioExists) id: string) {
    this.usuarioRepository.remove(id);
  }
}

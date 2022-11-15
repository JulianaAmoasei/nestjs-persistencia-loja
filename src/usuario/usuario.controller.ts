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

import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { UsuarioService } from './usuario.service';
import { UsuarioExists } from './validacoes/usuario-exists.validator';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async listaTodos(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuarioService.buscaTodos();
    return usuarios;
  }

  @Post()
  async criaUsuario(
    @Body() dadosUsuario: CriaUsuarioDTO,
  ): Promise<ListaUsuarioDTO> {
    const usuarioCriado = await this.usuarioService.criaNovo(dadosUsuario);
    return usuarioCriado;
  }

  @Put('/:id')
  async editaUsuario(
    @Param('id', UsuarioExists) id,
    @Body() dadosUsuario: AtualizaUsuarioDTO,
  ): Promise<ListaUsuarioDTO> {
    const usuarioAtualizado = await this.usuarioService.atualiza(
      id,
      dadosUsuario,
    );

    return usuarioAtualizado;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUsuario(@Param('id', UsuarioExists) id: string): Promise<void> {
    await this.usuarioService.removeComId(id);
  }
}

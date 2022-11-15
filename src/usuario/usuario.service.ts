import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async existeComId(id: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    return usuario !== null;
  }

  async removeComId(id: string): Promise<void> {
    await this.usuarioRepository.delete({ id });
  }

  async criaNovo(dadosUsuario: CriaUsuarioDTO): Promise<ListaUsuarioDTO> {
    const novoUsuario = this.mapToEntity(dadosUsuario);
    const usuarioCriado = await this.usuarioRepository.save(novoUsuario);
    return new ListaUsuarioDTO(
      usuarioCriado.id,
      usuarioCriado.email,
      usuarioCriado.dataCriacao,
    );
  }

  async atualiza(
    id: string,
    dadosAtualizacao: AtualizaUsuarioDTO,
  ): Promise<ListaUsuarioDTO> {
    const usuarioParaAtualizar = this.mapToEntity(dadosAtualizacao);
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

  async buscaTodos(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((usuario) => {
      return new ListaUsuarioDTO(
        usuario.id,
        usuario.email,
        usuario.dataCriacao,
      );
    });
  }

  private mapToEntity(
    dados: CriaUsuarioDTO | AtualizaUsuarioDTO,
  ): UsuarioEntity {
    const usuario = new UsuarioEntity();
    usuario.email = dados.email;
    usuario.senha = dados.senha;
    return usuario;
  }
}

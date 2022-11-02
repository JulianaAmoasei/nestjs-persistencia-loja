import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';

@Injectable()
export class UsuarioRepository {
  private usuarios = [
    {
      id: '372a0d79-e7c3-4993-baec-23f0db6d6e2d',
      email: 'josue@email.com',
      senha: 'alksjdkajsdkjaksjdkajsdkjasd',
      dataCriacao: new Date(),
      dataAtualizacao: null,
    },
    {
      id: 'b3c15536-07cd-4d32-8a8f-f30b13f8efee',
      email: 'ricardo@email.com',
      senha: 'aslkdlakslkdlklqkwlkeq',
      dataCriacao: new Date(),
      dataAtualizacao: null,
    },
  ];

  listaTodos() {
    return this.usuarios;
  }

  salva(dadosUsuario) {
    const usuarioCadastrado = {
      id: randomUUID(),
      ...dadosUsuario,
      dataCriacao: new Date(),
      dataAtualizacao: null,
    };

    this.usuarios.push(usuarioCadastrado);
    return usuarioCadastrado;
  }

  existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }

  buscaPorId(id: string) {
    return this.usuarios.find((usuario) => usuario.id === id) || null;
  }

  atualiza(id: string, dadosUsuario: AtualizaUsuarioDTO) {
    const usuario = this.buscaPorId(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    Object.entries(dadosUsuario).forEach(([key, value]) => {
      if (key === 'id') return;
      usuario[key] = value;
    });

    usuario.dataAtualizacao = new Date();

    return usuario;
  }

  remove(id: string) {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
  }
}

export class ListaUsuarioDTO {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly dataCriacao: Date,
  ) {}
}

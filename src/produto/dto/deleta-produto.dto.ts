import { IsUUID } from 'class-validator';
export class DeletaProdutoDTO {
  @IsUUID()
  usuarioId: string;

  @IsUUID()
  id: string;
}

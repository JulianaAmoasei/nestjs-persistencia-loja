import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produtos_caracteristicas')
export class ProdutoCaracteristicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProdutoEntity)
  produto: ProdutoEntity;

  @Column()
  nome: string;
  @Column()
  descricao: string;
}

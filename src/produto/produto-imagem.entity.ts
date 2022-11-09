import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produtos_imagens')
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProdutoEntity)
  produto: ProdutoEntity;

  @Column()
  url: string;
  @Column()
  descricao: string;
}

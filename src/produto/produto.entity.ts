import { UsuarioEntity } from '../usuario/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';

@Entity('produtos')
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioEntity)
  usuario: UsuarioEntity;

  @Column()
  nome: string;

  @Column({ type: 'decimal' })
  valor: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'text' })
  descricao: string;

  @OneToMany(() => ProdutoCaracteristicaEntity, (cp) => cp.produto, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  caracteristicas: ProdutoCaracteristicaEntity[];

  @OneToMany(() => ProdutoImagemEntity, (ip) => ip.produto, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  imagens: ProdutoImagemEntity[];

  @Column()
  categoria: string;
}

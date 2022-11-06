import { UsuarioEntity } from '../usuario/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => CaracteristicaProduto, (cp) => cp.produto, { cascade: true })
  caracteristicas: CaracteristicaProduto[];

  @OneToMany(() => ImagemProduto, (ip) => ip.produto, { cascade: true })
  imagens: ImagemProduto[];

  @Column()
  categoria: string;
}

@Entity('produtos_caracteristicas')
export class CaracteristicaProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProdutoEntity)
  produto: ProdutoEntity;

  @Column()
  nome: string;
  @Column()
  descricao: string;
}

@Entity('produtos_imagens')
export class ImagemProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProdutoEntity)
  produto: ProdutoEntity;

  @Column()
  url: string;
  @Column()
  descricao: string;
}

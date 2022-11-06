import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserProductsRelations1667777991846
  implements MigrationInterface
{
  name = 'createUserProductsRelations1667777991846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`produtos\` ADD \`usuarioId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_caracteristicas\` ADD \`produtoId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_imagens\` ADD \`produtoId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos\` ADD CONSTRAINT \`FK_5b4ca3f45d7912442bbdabb79ef\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_caracteristicas\` ADD CONSTRAINT \`FK_0b227ec9bcbdd0b20f1eb128519\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_imagens\` ADD CONSTRAINT \`FK_fb1eff8ce3367f3d01cdae39b03\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`produtos_imagens\` DROP FOREIGN KEY \`FK_fb1eff8ce3367f3d01cdae39b03\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_caracteristicas\` DROP FOREIGN KEY \`FK_0b227ec9bcbdd0b20f1eb128519\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos\` DROP FOREIGN KEY \`FK_5b4ca3f45d7912442bbdabb79ef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_imagens\` DROP COLUMN \`produtoId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos_caracteristicas\` DROP COLUMN \`produtoId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`produtos\` DROP COLUMN \`usuarioId\``,
    );
  }
}

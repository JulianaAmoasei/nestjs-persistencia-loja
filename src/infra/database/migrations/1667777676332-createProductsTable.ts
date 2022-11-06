import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductsTable1667777676332 implements MigrationInterface {
  name = 'createProductsTable1667777676332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`produtos_caracteristicas\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`produtos_imagens\` (\`id\` varchar(36) NOT NULL, \`url\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`produtos\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`valor\` decimal NOT NULL, \`quantidade\` int NOT NULL, \`descricao\` text NOT NULL, \`categoria\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`produtos\``);
    await queryRunner.query(`DROP TABLE \`produtos_imagens\``);
    await queryRunner.query(`DROP TABLE \`produtos_caracteristicas\``);
  }
}

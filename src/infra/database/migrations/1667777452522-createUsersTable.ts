import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersTable1667777452522 implements MigrationInterface {
    name = 'createUsersTable1667777452522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(150) NOT NULL, \`senha\` varchar(200) NOT NULL, \`dataCriacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dataAtualizacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}

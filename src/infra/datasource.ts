import 'dotenv/config';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

const entitiesGlob = join(__dirname, '..', '*', '**.entity.ts');
const migrationsDir = join(__dirname, 'database', 'migrations', '*.ts');

const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: String(process.env.DATABASE_URL),
  entities: [entitiesGlob],
  migrations: [migrationsDir],
};

const datasource = new DataSource(datasourceOptions);

export { datasource as default, datasourceOptions };

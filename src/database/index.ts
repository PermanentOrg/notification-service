import * as path from 'path';
import { TinyPg } from 'tinypg';
import { migrate as pgMigrate } from 'postgres-migrations';
import { logger } from '../log';

const db = new TinyPg({
  connection_string: process.env.DATABASE_URL,
  root_dir: [path.resolve(__dirname, 'queries')],
});

const migrate = async (): Promise<void> => {
  const client = await db.getClient();
  await pgMigrate(
    { client },
    path.resolve(__dirname, 'migrations'),
    { logger: logger.info },
  );
};

export { db, migrate };

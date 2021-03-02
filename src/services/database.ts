import { TinyPg } from 'tinypg';
import { migrate as pgMigrate } from 'postgres-migrations';

const db = new TinyPg({
  connection_string: process.env.DATABASE_URL,
  root_dir: ['src/db/queries'],
});

const migrate = async (): Promise<void> => {
  const client = await db.getClient();
  await pgMigrate(
    { client },
    'src/db/migrations',
    // eslint-disable-next-line no-console -- TODO: set up proper logging
    { logger: console.log },
  );
};

export { db, migrate };

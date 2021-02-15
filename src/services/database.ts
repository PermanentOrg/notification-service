import { TinyPg } from 'tinypg';

const db = new TinyPg({
  connection_string: process.env.DATABASE_URL,
  root_dir: ['src/db/'],
});

export { db };

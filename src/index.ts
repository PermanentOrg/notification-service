import { requireEnv } from 'require-env-variable';

import { app } from './app';
import { migrate } from './database';

requireEnv(
  'DATABASE_URL',
);

migrate().then(() => (
  app.listen(process.env.PORT ?? 3000)
)).catch((err) => {
  // eslint-disable-next-line no-console -- TODO: set up proper logging
  console.error(err);
  process.exit(1);
});

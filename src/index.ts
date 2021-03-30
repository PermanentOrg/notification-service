import { app } from './app';
import { migrate } from './database';

migrate().then(() => (
  app.listen(process.env.PORT ?? 3000)
)).catch((err) => {
  // eslint-disable-next-line no-console -- TODO: set up proper logging
  console.error(err);
  process.exit(1);
});

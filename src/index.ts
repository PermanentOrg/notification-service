import './env';
import { app } from './app';
import { startup } from './startup';
import { logger } from './log';

const port = process.env.PORT ?? 3000;
startup().then(() => (
  app.listen(port, () => {
    logger.info(`notification-service listening on port ${port}`);
  })
)).catch((err) => {
  logger.error(err);
  process.exit(1);
});

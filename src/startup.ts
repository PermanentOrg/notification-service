import { migrate } from './database';

const startup = async (): Promise<unknown[]> => Promise.all([
  migrate(),
]);

export { startup };

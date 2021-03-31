import { db } from '../database';

enum HealthStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

const getHealth = async (): Promise<HealthStatus> => {
  try {
    await db.sql('health');
    return HealthStatus.AVAILABLE;
  } catch (err: unknown) {
    // eslint-disable-next-line no-console -- TODO: set up proper logging
    console.log('Error connecting to database', err);
    return HealthStatus.UNAVAILABLE;
  }
};

export const healthService = {
  getHealth,
};

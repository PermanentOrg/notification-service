import { db } from './database';

enum HealthStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

const getHealth = async (): Promise<HealthStatus> => {
  try {
    await db.sql('health');
    return HealthStatus.AVAILABLE;
  } catch (err: unknown) {
    console.log('Error connecting to database', err);
    return HealthStatus.UNAVAILABLE;
  }
};

export const healthService = {
  getHealth,
};

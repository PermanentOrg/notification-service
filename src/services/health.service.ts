import { db } from '../database';
import { validateHealth } from './message.service';

enum HealthStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

const getHealth = async (): Promise<HealthStatus> => {
  try {
    await db.sql('health');
  } catch (err: unknown) {
    // eslint-disable-next-line no-console -- TODO: set up proper logging
    console.log('Error connecting to database', err);
    return HealthStatus.UNAVAILABLE;
  }
  try {
    await validateHealth();
  } catch (err: unknown) {
    // eslint-disable-next-line no-console -- TODO: set up proper logging
    console.log('Error connecting to Firebase', err);
    return HealthStatus.UNAVAILABLE;
  }
  return HealthStatus.AVAILABLE;
};

export const healthService = {
  getHealth,
};

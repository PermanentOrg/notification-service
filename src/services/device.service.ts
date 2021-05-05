import { db } from '../database';

export interface Device {
  userId: number;
  deviceToken: string;
}

const addDevice = async (device: Device): Promise<void> => {
  await db.sql('insert-devices', {
    user_id: device.userId,
    device_token: device.deviceToken,
  });
};

const getDeviceTokensForUser = async (userId: number): Promise<string[]> => (
  (await db.sql<{ device_token: string }>('get-device-tokens-for-user', {
    userId,
  })).rows.map((row) => row.device_token)
);

const removeDeviceToken = async (deviceToken: string): Promise<void> => {
  await db.sql('delete-device-token', {
    deviceToken,
  });
};

export const deviceService = {
  addDevice,
  getDeviceTokensForUser,
  removeDeviceToken,
};

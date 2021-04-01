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

export const deviceService = {
  addDevice,
};

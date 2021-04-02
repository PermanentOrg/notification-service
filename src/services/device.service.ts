import { db } from '../database';

export interface Device {
    deviceId: number;
    userId: number;
    deviceToken: string;
}

interface InsertDeviceResult{
    device_id: number;
}

const addDevice = async (device: Device): Promise<number> => {
    const result = await db.sql<InsertDeviceResult>('insert-devices', {
    user_id: device.userId,
    device_token:device.deviceToken,
    });
    return result.rows[0].device_id;
};

export const deviceService = {
    addDevice,
};

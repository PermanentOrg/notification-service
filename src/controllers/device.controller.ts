import type {
  Handler,
  Request,
  Response,
} from 'express';
import { deviceService } from '../services';
import { validateCreateDeviceParams } from '../validators';

interface Devices{
  userId: number;
  deviceToken: string;
}

const addDevice: Handler = (
  req: Request,
  res: Response,
): void => {
  const validation = validateCreateDeviceParams(req.body);
  if (validation.error) {
    res.status(400).json({ error: validation.error });
  } else {
    deviceService.addDevice(req.body)
      .then(() => res.json(req.body))
      .catch((err: unknown) => res.status(500).json({
        error: err,
      }));
  }
};
const deleteDevice: Handler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const validation = validateCreateDeviceParams(req.body);
  if (validation.error) {
    res.status(400).json({ error: validation.error });
  } else {
    const device = req.body as Devices;
    if ((await deviceService.getDeviceTokensForUser(device.userId)).includes(device.deviceToken)) {
      deviceService.removeDeviceToken(device.deviceToken)
        .then(() => res.json('Device is successfully removed.'))
        .catch((err: unknown) => res.status(500).json({
          error: err,
        }));
    } else {
      res.status(404).json('Device was not found.');
    }
  }
};
export const deviceController = {
  addDevice,
  deleteDevice,
};

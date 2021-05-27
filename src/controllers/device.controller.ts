import type {
  Handler,
  Request,
  Response,
} from 'express';
import { deviceService } from '../services';
import { validateCreateDeviceParams } from '../validators';

interface Devices{
  userId: number;
  token: string;
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
const deleteDevice: Handler = (
  req: Request,
  res: Response,
): void => {
  const validation = validateCreateDeviceParams(req.body);
  if (validation.error) {
    res.status(400).json({ error: validation.error });
  } else {
    const device = req.body as Devices;
    deviceService.removeDeviceToken(device.token)
      .then(() => res.json('Device is successfully removed.'))
      .catch((err: unknown) => res.status(500).json({
        error: err,
      }));
  }
};
export const deviceController = {
  addDevice,
  deleteDevice,
};

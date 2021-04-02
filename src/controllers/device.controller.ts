import type {
    Handler,
    Request,
    Response,
  } from 'express';
import { deviceService } from '../services';

const addDevice: Handler = (
    req: Request,
    res: Response,
): void => {
    deviceService.addDevice(req.body)
    .then((data) => res.json(data))
    .catch((err: unknown) => res.status(500).json({
        error: err,
    }));

  };

  export const deviceController = {
    addDevice,
  };

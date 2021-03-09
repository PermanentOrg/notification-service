import type {
  Handler,
  Request,
  Response,
} from 'express';
import { notificationService } from '../services';

const createNotification: Handler = (
  req: Request,
  res: Response,
): void => {
  notificationService.createNotification(req.body)
    .then((data) => res.json(data))
    .catch((err: unknown) => res.status(500).json({
      error: err,
    }));
};

export const notificationController = {
  createNotification,
};

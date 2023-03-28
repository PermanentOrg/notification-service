import type {
  Handler,
  Request,
  Response,
} from 'express';
import { notificationService } from '../services';
import { validateCreateNotificationParams } from '../validators';

const createNotification: Handler = (
  req: Request,
  res: Response,
): void => {
  const validation = validateCreateNotificationParams(req.body);
  if (validation.error) {
    res.status(400).json({ error: validation.error });
  } else {
    notificationService.createNotification(req.body)
      .then((data) => res.json(data))
      .catch((err: unknown) => res.status(500).json({
        error: err,
      }));
  }
};

export const notificationController = {
  createNotification,
};

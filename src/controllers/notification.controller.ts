import type {
  Handler,
  Request,
  Response,
} from 'express';
import { notificationService } from '../services';
import { validateCreateNotificationParams, isValidationError } from '../validators';

const createNotification: Handler = (
  req: Request,
  res: Response,
): void => {
  try {
    validateCreateNotificationParams(req.body);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
    } else {
      throw err;
    }
  }
  if (validateCreateNotificationParams(req.body)) {
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

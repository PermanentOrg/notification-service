import Joi from 'joi';
import type { Notification } from '../services/notification.service';

export const validateCreateNotificationParams = (
  data: Notification,
): Joi.ValidationResult => Joi.object().keys({
  notificationType: Joi.string().required(),
  toUserId: Joi.number().min(1).required(),
}).validate(
  data,
  { abortEarly: false },
);

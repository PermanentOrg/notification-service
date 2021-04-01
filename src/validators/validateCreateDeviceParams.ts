import Joi from 'joi';
import type { Device } from '../services/device.service';

export const validateCreateDeviceParams = (
  data: Device,
): Joi.ValidationResult => Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  deviceToken: Joi.string().required(),
}).validate(
  data,
  { abortEarly: false },
);

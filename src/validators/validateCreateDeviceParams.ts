import Joi from 'joi';
import type { Device } from '../services/device.service';

export const validateCreateDeviceParams = (
  data: unknown,
): data is Device => {
  const validation = Joi.object().keys({
    userId: Joi.number().integer().min(1).required(),
    deviceToken: Joi.string().required(),
  }).validate(
    data,
    { abortEarly: false },
  );
  if (validation.error) {
    throw validation.error;
  }
  return true;
};

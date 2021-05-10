import Joi from 'joi';

export const validateCreateNotificationParams = (
  data: unknown,
): Joi.ValidationResult => Joi.object().keys({
  notificationType: Joi.string().required(),
  toUserId: Joi.number().integer().min(1).required(),
}).validate(
  data,
  { abortEarly: false },
);

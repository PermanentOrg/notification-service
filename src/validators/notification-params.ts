import Joi from "joi";
import type { Notification } from "../services/notification.service";

const forbiddenKeys = [
	// Permanent-defined
	"notificationType",
	"toUserId",

	// Google-defined
	// https://firebase.google.com/docs/cloud-messaging/concept-options#data_messages
	"from",
	"message_type",
	"notification",
];

const validateCreateNotificationParams = (
	data: unknown,
): data is Notification => {
	const validation = Joi.object()
		.keys({
			notificationType: Joi.string().required(),
			toUserId: Joi.number().integer().min(1).required(),
			context: Joi.object().pattern(
				Joi.string()
					.invalid(...forbiddenKeys)
					.regex(/^(google|gcm)/i, { invert: true })
					.insensitive(),
				Joi.string().required(),
			),
		})
		.validate(data, { abortEarly: false });
	if (validation.error) {
		throw validation.error;
	}
	return true;
};

export { forbiddenKeys, validateCreateNotificationParams };

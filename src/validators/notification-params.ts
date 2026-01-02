import Joi from "joi";
import { MINIMUM_USER_ID } from "../constants";
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
			toUserId: Joi.number().integer().min(MINIMUM_USER_ID).required(),
			context: Joi.object().pattern(
				Joi.string()
					.invalid(...forbiddenKeys)
					.regex(/^(?:google|gcm)/i, { invert: true })
					.insensitive(),
				Joi.string().required(),
			),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
	return true;
};

export { forbiddenKeys, validateCreateNotificationParams };

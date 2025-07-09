import Joi from "joi";
import { MINIMUM_USER_ID } from "../constants";
import type { Device } from "../services/device.service";

export const validateCreateDeviceParams = (data: unknown): data is Device => {
	const validation = Joi.object()
		.keys({
			userId: Joi.number().integer().min(MINIMUM_USER_ID).required(),
			deviceToken: Joi.string().required(),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
	return true;
};

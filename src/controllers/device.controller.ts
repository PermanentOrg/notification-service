import type { Handler, Request, Response } from "express";
import { deviceService } from "../services";
import { validateCreateDeviceParams, isValidationError } from "../validators";
import { HTTP_STATUS } from "@pdc/http-status-codes";

const addDevice: Handler = (req: Request, res: Response): void => {
	const body: unknown = req.body;
	try {
		validateCreateDeviceParams(body);
	} catch (err) {
		if (isValidationError(err)) {
			res.status(HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST).json({ error: err });
		} else {
			throw err;
		}
	}
	if (validateCreateDeviceParams(body)) {
		const { userId, deviceToken } = body;
		deviceService
			.addDevice({ userId, deviceToken })
			.then(() => res.json({ userId, deviceToken }))
			.catch((err: unknown) =>
				res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
					error: err,
				}),
			);
	}
};
const deleteDevice: Handler = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const body: unknown = req.body;
	try {
		validateCreateDeviceParams(body);
	} catch (err) {
		if (isValidationError(err)) {
			res.status(HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST).json({ error: err });
		} else {
			throw err;
		}
	}
	if (validateCreateDeviceParams(body)) {
		const { userId, deviceToken } = body;
		if (
			(await deviceService.getDeviceTokensForUser(userId)).includes(deviceToken)
		) {
			deviceService
				.removeDeviceToken(deviceToken)
				.then(() => res.json("Device is successfully removed."))
				.catch((err: unknown) =>
					res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
						error: err,
					}),
				);
		} else {
			res
				.status(HTTP_STATUS.CLIENT_ERROR.NOT_FOUND)
				.json("Device was not found.");
		}
	}
};
export const deviceController = {
	addDevice,
	deleteDevice,
};

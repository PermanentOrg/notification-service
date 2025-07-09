import type { Handler, Request, Response } from "express";
import { deviceService } from "../services";
import { validateCreateDeviceParams, isValidationError } from "../validators";
import { HTTP_STATUS } from "@pdc/http-status-codes";

interface Devices {
	userId: number;
	deviceToken: string;
}

const addDevice: Handler = (req: Request, res: Response): void => {
	try {
		validateCreateDeviceParams(req.body);
	} catch (err) {
		if (isValidationError(err)) {
			res.status(HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST).json({ error: err });
		} else {
			throw err;
		}
	}
	if (validateCreateDeviceParams(req.body)) {
		deviceService
			.addDevice(req.body)
			.then(() => res.json(req.body))
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
	try {
		validateCreateDeviceParams(req.body);
	} catch (err) {
		if (isValidationError(err)) {
			res.status(HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST).json({ error: err });
		} else {
			throw err;
		}
	}
	if (validateCreateDeviceParams(req.body)) {
		const device = req.body as Devices;
		if (
			(await deviceService.getDeviceTokensForUser(device.userId)).includes(
				device.deviceToken,
			)
		) {
			deviceService
				.removeDeviceToken(device.deviceToken)
				.then(() => res.json("Device is successfully removed."))
				.catch((err: unknown) =>
					res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
						error: err,
					}),
				);
		} else {
			res.status(HTTP_STATUS.CLIENT_ERROR.NOT_FOUND).json("Device was not found.");
		}
	}
};
export const deviceController = {
	addDevice,
	deleteDevice,
};

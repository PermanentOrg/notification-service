import type { Handler, Request, Response } from "express";
import { deviceService } from "../services";
import { validateCreateDeviceParams, isValidationError } from "../validators";

interface Devices {
	userId: number;
	deviceToken: string;
}

const addDevice: Handler = (req: Request, res: Response): void => {
	try {
		validateCreateDeviceParams(req.body);
	} catch (err) {
		if (isValidationError(err)) {
			res.status(400).json({ error: err });
		} else {
			throw err;
		}
	}
	if (validateCreateDeviceParams(req.body)) {
		deviceService
			.addDevice(req.body)
			.then(() => res.json(req.body))
			.catch((err: unknown) =>
				res.status(500).json({
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
			res.status(400).json({ error: err });
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
					res.status(500).json({
						error: err,
					}),
				);
		} else {
			res.status(404).json("Device was not found.");
		}
	}
};
export const deviceController = {
	addDevice,
	deleteDevice,
};

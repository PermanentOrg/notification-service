import type { Handler, Request, Response } from "express";
import { notificationService } from "../services";
import {
	validateCreateNotificationParams,
	isValidationError,
} from "../validators";
import { HTTP_STATUS } from "@pdc/http-status-codes";

const createNotification: Handler = (req: Request, res: Response): void => {
	try {
		validateCreateNotificationParams(req.body);
	} catch (err) {
		if (isValidationError(err)) {
			res.status(HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST).json({ error: err });
		} else {
			throw err;
		}
	}
	if (validateCreateNotificationParams(req.body)) {
		notificationService
			.createNotification(req.body)
			.then((data) => res.json(data))
			.catch((err: unknown) =>
				res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
					error: err,
				}),
			);
	}
};

export const notificationController = {
	createNotification,
};

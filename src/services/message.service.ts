import admin from "firebase-admin";
import type { messaging, ServiceAccount } from "firebase-admin";
import { deviceService } from "./device.service";
import type { Notification } from "./notification.service";
import { logger } from "../log";

const credentials: unknown = JSON.parse(process.env.FIREBASE_CREDENTIALS ?? "");

if (typeof credentials !== "object" || credentials === null) {
	throw new Error(
		"Invalid or missing FIREBASE_CREDENTIALS environment variable",
	);
}

const firebaseApp = admin.initializeApp({
	credential: admin.credential.cert(credentials as ServiceAccount),
});
const messagingService = admin.messaging(firebaseApp);

const sendMessage = async (message: messaging.Message): Promise<string> =>
	await messagingService.send(message, false);

interface FirebaseErrorI {
	code: string;
	message: string;
}

const isFirebaseError = (err: unknown): err is FirebaseErrorI =>
	typeof err === "object" && err !== null && "code" in err && "message" in err;

const isInvalidTokenError = (err: unknown): boolean =>
	isFirebaseError(err) &&
	err.code === "messaging/invalid-argument" &&
	err.message ===
		"The registration token is not a valid FCM registration token";

const sendMessageToDevice = async (
	deviceToken: string,
	notificationType: string,
	context: Record<string, string>,
): Promise<string> => {
	logger.silly("Sending message", { deviceToken, notificationType, context });
	try {
		const messageId = await sendMessage({
			token: deviceToken,
			apns: {
				payload: {
					aps: {
						alert: {
							body: notificationType,
						},
						"mutable-content": true,
					},
				},
			},
			data: {
				notificationType,
				...context,
			},
		});
		logger.debug("Successfully sent message", { deviceToken, messageId });
		return messageId;
	} catch (err: unknown) {
		if (isInvalidTokenError(err)) {
			logger.warn(`Removing expired or invalid token: ${deviceToken}`);
			await deviceService.removeDeviceToken(deviceToken);
			return "";
		}

		throw err;
	}
};

const sendMessageToUser = async ({
	toUserId,
	notificationType,
	context,
}: Notification): Promise<string[]> => {
	const tokens = await deviceService.getDeviceTokensForUser(toUserId);
	return await Promise.all(
		tokens.map(
			async (token) =>
				await sendMessageToDevice(token, notificationType, context),
		),
	);
};

const sendDryRunMessage = async (message: messaging.Message): Promise<string> =>
	await messagingService.send(message, true);

const validateHealth = async (): Promise<boolean> => {
	await sendDryRunMessage({
		topic: "health-check",
	});
	return true;
};

export { sendMessageToUser, validateHealth };

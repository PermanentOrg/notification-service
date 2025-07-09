import { db } from "../database";
import { sendMessageToUser } from "./message.service";
import { logger } from "../log";

export interface Notification {
	toUserId: number;
	notificationType: string;
	context: Record<string, string>;
}

interface InsertNotificationResult {
	notification_id: number;
}

interface NotificationResponse {
	notificationId: number;
	message: string;
}

const createNotification = async (
	notification: Notification,
): Promise<NotificationResponse> => {
	const result = await db.sql<InsertNotificationResult>("insert-notification", {
		to_user_id: notification.toUserId,
		notification_type: notification.notificationType,
		context: notification.context,
	});
	setImmediate(() => {
		sendMessageToUser(notification).catch((error: unknown) =>
			// TODO: set up Sentry
			logger.error(`Error sending message to user ${notification.toUserId}`, {
				error,
			}),
		);
	});
	return {
		notificationId: result.rows[0].notification_id,
		message: "Successfully created a notification",
	};
};

export const notificationService = {
	createNotification,
};

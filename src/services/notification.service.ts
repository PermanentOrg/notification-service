import { db } from '../database';

export interface Notification {
  toUserId: number;
  notificationType: string;
}

interface InsertNotificationResult{
  notification_id: number;
}

interface NotificationResponse{
  notificationId: number;
  message: string;
}

const createNotification = async (notification: Notification): Promise<NotificationResponse> => {
  try {
    const result = await db.sql<InsertNotificationResult>('insert-notification', {
      to_user_id: notification.toUserId,
      notification_type: notification.notificationType,
    });
    return {
      notificationId: result.rows[0].notification_id,
      message: 'Successfully created a notification',
    };
  } catch (err: unknown) {
    let errmessage = 'unknown error';
    if (err instanceof Error) {
      errmessage = err.message;
    }
    return {
      notificationId: 0,
      message: errmessage,
    };
  }
};

export const notificationService = {
  createNotification,
};

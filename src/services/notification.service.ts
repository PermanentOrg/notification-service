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
  const result = await db.sql<InsertNotificationResult>('insert-notification', {
    to_user_id: notification.toUserId,
    notification_type: notification.notificationType,
  });
  return {
    notificationId: result.rows[0].notification_id,
    message: 'Successfully created a notification',
  };
};

export const notificationService = {
  createNotification,
};

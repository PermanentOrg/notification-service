import { db } from '../database';

export interface Notification {
  toUserId: number;
  notificationType: string;
}

interface InsertNotificationResult{
  notification_id: number;
}

const createNotification = async (notification: Notification): Promise<unknown> => {
  const result = await db.sql<InsertNotificationResult>('insert-notification', {
    to_user_id: notification.toUserId,
    notification_type: notification.notificationType,
  });
  const jsonResult = {
    notificationId: result.rows[0].notification_id,
    message: 'Successfully created a notification',
  };
  return jsonResult;
};

export const notificationService = {
  createNotification,
};

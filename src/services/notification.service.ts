import { db } from '../database';

export interface Notification {
  toUserId: number;
  notificationType: string;
}

interface InsertNotificationResult{
  notification_id: number;
}

const createNotification = async (notification: Notification): Promise<number> => {
  const result = await db.sql<InsertNotificationResult>('insert-notification', {
    to_user_id: notification.toUserId,
    notification_type: notification.notificationType,
  });
  return result.rows[0].notification_id;
};

export const notificationService = {
  createNotification,
};

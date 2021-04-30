INSERT
INTO notifications (to_user_id, notification_type, context)
VALUES (:to_user_id, :notification_type, :context)
RETURNING notification_id

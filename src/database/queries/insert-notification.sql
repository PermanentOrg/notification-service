INSERT 
INTO notifications (to_user_id, notification_type) 
VALUES (:to_user_id, :notification_type)
RETURNING notification_id

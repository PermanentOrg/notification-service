INSERT
INTO devices (user_id, device_token)
VALUES (:user_id, :device_token)
RETURNING device_id

INSERT
INTO devices (user_id, device_token)
VALUES (:user_id, :device_token)
ON CONFLICT ON CONSTRAINT unique_device_token DO UPDATE SET user_id = :user_id;

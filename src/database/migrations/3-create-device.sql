CREATE TABLE devices (
    user_id INTEGER NOT NULL,
    device_token TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, device_token)
)

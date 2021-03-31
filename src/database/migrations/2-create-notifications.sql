CREATE TABLE notifications (
    notification_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    to_user_id INTEGER NOT NULL,
    notification_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
)

ALTER TABLE devices
ADD CONSTRAINT unique_device_token UNIQUE (device_token);

-- Don't use timestamp without time zone:
-- https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_timestamp_.28without_time_zone.29

-- This is a difficult problem to solve in the framework itself:
-- https://github.com/ThomWright/postgres-migrations/issues/55
-- instead, we can work around it by fixing it as our first migration

ALTER TABLE migrations
ALTER COLUMN executed_at
SET DATA TYPE TIMESTAMP WITH TIME ZONE

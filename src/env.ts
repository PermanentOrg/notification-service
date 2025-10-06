import { requireEnv } from "require-env-variable";

requireEnv("DATABASE_URL", "FIREBASE_CREDENTIALS");

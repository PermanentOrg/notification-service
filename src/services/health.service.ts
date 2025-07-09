import { db } from "../database";
import { validateHealth } from "./message.service";
import { logger } from "../log";

enum HealthStatus {
	AVAILABLE = "available",
	UNAVAILABLE = "unavailable",
}

const getHealth = async (): Promise<HealthStatus> => {
	try {
		await db.sql("health");
	} catch (error: unknown) {
		logger.error("Error connecting to database", { error });
		return HealthStatus.UNAVAILABLE;
	}
	try {
		await validateHealth();
	} catch (error: unknown) {
		logger.error("Error connecting to Firebase", { error });
		return HealthStatus.UNAVAILABLE;
	}
	return HealthStatus.AVAILABLE;
};

export const healthService = {
	getHealth,
};

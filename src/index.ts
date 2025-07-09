import "./env";
import { app } from "./app";
import { startup } from "./startup";
import { logger } from "./log";
import { ExitCode } from "./constants";

const DEFAULT_PORT = 3000;

const port = process.env.PORT ?? DEFAULT_PORT;
startup()
	.then(() =>
		app.listen(port, () => {
			logger.info(`notification-service listening on port ${port}`);
		}),
	)
	.catch((err) => {
		logger.error(err);
		process.exit(ExitCode.ERROR);
	});

import { migrate } from "./database";
import { validateHealth } from "./services/message.service";

const startup = async (): Promise<unknown[]> =>
	Promise.all([migrate(), validateHealth()]);

export { startup };

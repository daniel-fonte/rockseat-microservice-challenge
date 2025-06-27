import { pino } from "pino";
import { ENV } from "../../env.ts";

export const logger = pino({
    name: 'invoices',
    level: ENV.LOG_LEVEL
})
import '@opentelemetry/auto-instrumentations-node/register'

import DrizzleOrmProvider from "./providers/drizzleOrm/index.ts";
import { server } from "./http/index.ts";
import FastifyProvider from "./providers/fastifyProvider/index.ts";

async function bootstrap() {
    await FastifyProvider.getInstance()

    await DrizzleOrmProvider.getInstace()
    
    await server.initialize()
}

bootstrap()


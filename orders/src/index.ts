import '@opentelemetry/auto-instrumentations-node/register'

import RabbitMqProvider from "./providers/rabbitmq/index.ts";
import DrizzleOrmProvider from "./providers/drizzleOrm/index.ts";
import { server } from "./http/index.ts";
import FastifyProvider from "./providers/fastifyProvider/index.ts";

async function bootstrap() {
    await FastifyProvider.getInstance()

    await DrizzleOrmProvider.getInstace()

    await RabbitMqProvider.getInstance()

    
    await server.initialize()
}

bootstrap()


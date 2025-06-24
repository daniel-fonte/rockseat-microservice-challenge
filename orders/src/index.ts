import RabbitMqProvider from "./providers/rabbitmq/index.ts";
import DrizzleOrmProvider from "./providers/drizzleOrm/index.ts";
import { server } from "./http/index.ts";

DrizzleOrmProvider.getInstace().then(() => {
    RabbitMqProvider.getInstance().then(() => {
        server.initialize()
    })
})


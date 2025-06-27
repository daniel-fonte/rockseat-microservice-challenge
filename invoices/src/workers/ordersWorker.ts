import { ordersConsumer } from "../message-broker/rabbitmq-consumer.ts"
import RabbitMqProvider from "../providers/rabbitmq/index.ts"

async function bootstrap() {
    await RabbitMqProvider.getInstance()

    await ordersConsumer()
}

bootstrap()
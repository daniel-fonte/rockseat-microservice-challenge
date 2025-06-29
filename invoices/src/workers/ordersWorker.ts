import OrderHandler from "../handlers/OrderHandler.ts"
import RabbitMqProvider from "../providers/rabbitmq/index.ts"

async function bootstrap() {
    await RabbitMqProvider.getInstance()

    const orderHandler = new OrderHandler()

    await orderHandler.execute() 
}

bootstrap()
import OrderHandler from "../handlers/OrderHandler.ts"
import DrizzleOrmProvider from "../providers/drizzleOrm/index.ts"
import RabbitMqProvider from "../providers/rabbitmq/index.ts"

async function bootstrap() {
    await RabbitMqProvider.getInstance()
    
    await DrizzleOrmProvider.getInstace()

    const orderHandler = new OrderHandler()

    await orderHandler.execute() 
}

bootstrap()
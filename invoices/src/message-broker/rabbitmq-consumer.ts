import { logger } from "../providers/logger/index.ts";
import RabbitMqProvider from "../providers/rabbitmq/index.ts";



export const ordersConsumer = async () => {
    const broker = RabbitMqProvider.getChannel()
    
    broker.consume('orders', (message) => {
        if(!message) logger.error('Consumer cancelled by server')

        logger.info(`Receveid message: ${message?.content.toString()}`)
    }, {
        noAck: false
    })
}
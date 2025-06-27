import { logger } from "../providers/logger/index.ts";
import RabbitMqProvider from "../providers/rabbitmq/index.ts";
import type { IOrderCreatedMessage } from '../../../interfaces/messages/IOrderCreatedMessage.ts'

export const ordersConsumer = async () => {
    const broker = RabbitMqProvider.getChannel()
    
    broker.consume('orders', (message) => {
        if(!message) {
            logger.error('Consumer cancelled by server')
            return null
        }

        const content = JSON.parse(message.content.toString())

        const order = content as IOrderCreatedMessage

        console.log(order.customerId)

        logger.info(`Receveid message: ${message?.content.toString()}`)

        broker.ack(message)
    }, {
        noAck: false
    })
}
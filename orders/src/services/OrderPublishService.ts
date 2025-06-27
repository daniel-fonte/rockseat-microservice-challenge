import RabbitMqProvider from "../providers/rabbitmq/index.ts";
import { channels } from "../providers/rabbitmq/channels/index.ts"
import type { IOrderCreatedMessage } from '../../../interfaces/messages/IOrderCreatedMessage.ts'
import { logger } from "../providers/logger/index.ts";

class OrderPublishService {

    async execute(payload: IOrderCreatedMessage) {
        try {
            const orderChannel = await channels.getOrdersChannel()
            
            orderChannel.sendToQueue('orders', Buffer.from(JSON.stringify({ customerId: payload.customerId, orderId: payload.orderId })))

            logger.info(`Order ${payload.orderId} published on order queue`)
        } catch (error) {
            logger.error(`Order ${payload.orderId} not published`)
            throw error
        }
    }
}

export default new OrderPublishService()
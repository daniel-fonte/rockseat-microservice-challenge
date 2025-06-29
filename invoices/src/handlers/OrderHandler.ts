import { logger } from "../providers/logger/index.ts";
import RabbitMqProvider from "../providers/rabbitmq/index.ts";
import type { IOrderCreatedMessage } from '../../../interfaces/messages/IOrderCreatedMessage.ts'
import { Channel } from "amqplib";
import ProcessOrderService from "../services/ProcessOrderService.ts";

class OrderHandler {

    constructor(
        private readonly queue: string = 'orders',
        private readonly channel: Channel = RabbitMqProvider.getChannel(),
        private readonly service: ProcessOrderService = new ProcessOrderService()
    ) {}

    async execute() {
        this.channel.consume(this.queue, async (message) => {
            if(!message) {
                logger.error('Consumer cancelled by server')
                return null
            }

            const content = JSON.parse(message.content.toString())

            const order = content as IOrderCreatedMessage

            await this.service.execute(order)

            this.channel.ack(message)
        }, {
            noAck: false
        })
    }
}

export default OrderHandler
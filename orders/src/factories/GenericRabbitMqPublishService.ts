import IPublishService from '../intefaces/messaging/IPublishService.ts'
import { Channel } from 'amqplib'
import { logger } from '../providers/logger/index.ts'

class GenericRabbitMqPublishService<T> implements IPublishService<T> {
    constructor(
        private readonly channel: Channel,
        private readonly queueName: string
    ) {}

    async execute(payload: T): Promise<void> {
        try {
            this.channel.sendToQueue(
                this.queueName,
                Buffer.from(JSON.stringify(payload))
            )

            logger.info(`Published message on queue "${this.queueName}"`)
        } catch (error) {
            logger.error(`Failed to publish on "${this.queueName}"`, error)
            throw error;
        }
    }
}

export default GenericRabbitMqPublishService
import amqp, { ChannelModel } from 'amqplib'
import { logger } from '../logger/index.ts'
import { ENV } from '../../env.ts'

class RabbitMqProvider {
    private static instance: RabbitMqProvider | null = null
    private static connection: ChannelModel | null = null

    private constructor() {}

    static async getInstance(): Promise<RabbitMqProvider> {
        if (!RabbitMqProvider.instance) {
            RabbitMqProvider.instance = new RabbitMqProvider()
            await RabbitMqProvider.instance.connect()
        }
        
        return RabbitMqProvider.instance
    }

    private async connect() {
        try {
            const conn = await amqp.connect(ENV.BROKER_URL)
            RabbitMqProvider.connection = conn
            logger.info('Broker connected.')
        } catch (error) {
            logger.error('Broker not connected.', error)
            throw error
        }
    }

    static getConnection(): ChannelModel {
        if (!RabbitMqProvider.connection) {
            throw new Error('RabbitMQ connection not initialized.')
        }

        return RabbitMqProvider.connection
    }
}

export default RabbitMqProvider

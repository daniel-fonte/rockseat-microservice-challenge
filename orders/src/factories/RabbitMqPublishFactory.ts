import IPublishService from "../intefaces/messaging/IPublishService.ts";
import AbstractPublishServiceFactory from "../intefaces/messaging/AbstractPublishServiceFactory.ts";
import { getOrdersChannel } from "../providers/rabbitmq/channels/orders.ts";
import GenericRabbitMqPublishService from './GenericRabbitMqPublishService.ts'

class RabbitMqPublishFactory<T> extends AbstractPublishServiceFactory<T> {

    constructor(private readonly queueName: string) {
        super();
    }

    async create(): Promise<IPublishService<T>> {
        const channel = await getOrdersChannel()
        const publishService = new GenericRabbitMqPublishService<T>(channel, this.queueName)

        return publishService
    }

}

export default RabbitMqPublishFactory
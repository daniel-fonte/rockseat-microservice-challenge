import RabbitMqProvider from "../index.ts"

export async function getOrdersChannel() {
    const channel = RabbitMqProvider.getChannel()
    await channel.assertQueue('orders')
    return channel
}
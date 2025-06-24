import RabbitMqProvider from "../index.ts"

export const orders = await RabbitMqProvider.getConnection().createChannel()

await orders.assertQueue('orders')
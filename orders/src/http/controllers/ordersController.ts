import { FastifyReply, FastifyRequest } from "fastify"
import { CreateOrderInput } from "../schemas/orderSchema.ts"
import { channels } from "../../providers/rabbitmq/channels/index.ts"
import { ordersTable } from "../../database/schemas/order.ts"
import DrizzleOrmProvider from "../../providers/drizzleOrm/index.ts"

class orderController {

    async store(request: FastifyRequest<{ Body: CreateOrderInput }>, reply: FastifyReply) {
        try {
            const payload = request.body

            const orderToSave: typeof ordersTable.$inferInsert = {
                amount: payload.amount,
                customerId: payload.customerId
            }

            const orderSaved = await DrizzleOrmProvider.getConnection().insert(ordersTable).values(orderToSave).returning({ insertedId: ordersTable.id });

            request.log.info(`Order ${orderSaved[0].insertedId} stored on database`)

            const orderChannel = await channels.getOrdersChannel()

            orderChannel.sendToQueue('orders', Buffer.from(JSON.stringify({ customerId: payload.customerId, orderId: orderSaved[0].insertedId })))

            request.log.info(`Order ${orderSaved[0].insertedId} published on orders queue`)

            reply.status(201).send()
        } catch (error) {
            console.error(error)
        }
    }

}

export default new orderController()
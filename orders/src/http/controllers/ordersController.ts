import { FastifyReply, FastifyRequest } from "fastify"
import { CreateOrderInput } from "../schemas/orderSchema.ts"
import { channels } from "../../providers/rabbitmq/channels/index.ts"
import { ordersTable } from "../../database/schemas/order.ts"
import DrizzleOrmProvider from "../../providers/drizzleOrm/index.ts"
import OrderPublishService from "../../services/OrderPublishService.ts"

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
            
            await OrderPublishService.execute({ customerId: payload.customerId, orderId: orderSaved[0].insertedId })

            reply.status(201).send()
        } catch (error) {
            console.error(error)
        }
    }

}

export default new orderController()
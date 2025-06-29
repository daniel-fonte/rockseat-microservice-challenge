import { FastifyReply, FastifyRequest } from "fastify"
import { CreateOrderInput } from "../schemas/orderSchema.ts"
import { ordersTable } from "../../database/schemas/order.ts"
import DrizzleOrmProvider from "../../providers/drizzleOrm/index.ts"
import RabbitMqPublishFactory from "../../factories/RabbitMqPublishFactory.ts"
import { IOrderCreatedMessage } from '../../../../interfaces/messages/IOrderCreatedMessage.ts'
import { trace } from '@opentelemetry/api'

class OrdersController {

    async store(request: FastifyRequest<{ Body: CreateOrderInput }>, reply: FastifyReply) {
        try {
            const factory = new RabbitMqPublishFactory<IOrderCreatedMessage>('orders')

            const servicePublish = await factory.create()

            const payload = request.body

            const orderToSave: typeof ordersTable.$inferInsert = {
                amount: payload.amount,
                customerId: payload.customerId
            }

            const orderSaved = await DrizzleOrmProvider.getConnection().insert(ordersTable).values(orderToSave).returning({ insertedId: ordersTable.id })

            request.log.info(`Order ${orderSaved[0].insertedId} stored on database`)

            await servicePublish.execute({ customerId: payload.customerId, orderId: orderSaved[0].insertedId })
            
            trace.getActiveSpan()?.setAttribute('order_id', orderSaved[0].insertedId)

            reply.status(201).send()
        } catch (error) {
            console.error(error)
        }
    }

}

export default OrdersController
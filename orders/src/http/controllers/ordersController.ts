import { FastifyReply, FastifyRequest } from "fastify"
import { CreateOrderInput } from "../schemas/orderSchema.ts"
// import { channels } from "../../broker/channels/index.ts"

class orderController {

    async store(request: FastifyRequest<{ Body: CreateOrderInput }>, reply: FastifyReply) {
        const { amount } = request.body

        // channels.orders.sendToQueue('orders', Buffer.from('Hello, World!!'))

        request.log.info(`Creating order with amount: ${amount}`)

        reply.status(201).send()
    }

}

export default new orderController()
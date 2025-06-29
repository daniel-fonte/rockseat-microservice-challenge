import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createOrderSchema } from './schemas/orderSchema.ts'
import OrdersController from './controllers/OrdersController.ts'

const ordersController = new OrdersController()

const routes = async (fastifyInstance: FastifyInstance) => {
    const fastify = fastifyInstance.withTypeProvider<ZodTypeProvider>()

    fastify.get('/health', () => {
        return 'OK'
    })

    fastify.post('/orders', { schema: { body: createOrderSchema } }, ordersController.store)
}

export default routes
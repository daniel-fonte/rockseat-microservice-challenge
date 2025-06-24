import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import orderController from './controllers/ordersController.ts'
import { createOrderSchema } from './schemas/orderSchema.ts'

const routes = async (fastifyInstance: FastifyInstance) => {
    const fastify = fastifyInstance.withTypeProvider<ZodTypeProvider>()

    fastify.get('/health', () => {
        return 'OK'
    })

    fastify.post('/orders', { schema: { body: createOrderSchema } }, orderController.store)
}

export default routes
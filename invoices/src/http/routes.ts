import { FastifyInstance } from 'fastify'
import InvoicesController from './controllers/InvoicesController.ts'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const invoicesController = new InvoicesController()

const routes = async (fastifyInstance: FastifyInstance) => {
    const fastify = fastifyInstance.withTypeProvider<ZodTypeProvider>()

    fastify.get('/health', () => {
        return 'OK'
    })

    fastify.get('/invoices', invoicesController.index)
}

export default routes
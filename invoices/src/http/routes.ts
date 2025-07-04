import { FastifyInstance } from 'fastify'
import InvoicesController from './controllers/InvoicesController.ts'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { schema as invoicesSchema} from './schemas/InvoicesSchemas.ts'

const invoicesController = new InvoicesController()

const routes = async (fastifyInstance: FastifyInstance) => {
    const fastify = fastifyInstance.withTypeProvider<ZodTypeProvider>()

    fastify.get('/health', () => {
        return 'OK'
    })

    fastify.get('/invoices', { schema: invoicesSchema }, invoicesController.index)
}

export default routes
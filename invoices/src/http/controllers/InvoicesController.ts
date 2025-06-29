import { FastifyReply, FastifyRequest } from "fastify"
import ListAllInvoicesService from "../../services/ListAllInvoicesService.ts"
import { trace } from '@opentelemetry/api'

class InvoicesController {

    async index(request: FastifyRequest, reply: FastifyReply) {
        try {
            const service = new ListAllInvoicesService()

            const invoices = await service.execute()

            trace.getActiveSpan()?.setAttribute('invoices', JSON.stringify(invoices))

            reply.status(200).send(invoices)
        } catch (error) {
            console.error(error)
        }
    }

}

export default InvoicesController
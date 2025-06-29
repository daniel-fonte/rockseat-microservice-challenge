import { FastifyReply, FastifyRequest } from "fastify"
import DrizzleOrmProvider from "../../providers/drizzleOrm/index.ts"
import { IOrderCreatedMessage } from '../../../../interfaces/messages/IOrderCreatedMessage.ts'
import ListAllInvoicesService from "../../services/ListAllInvoicesService.ts"

class InvoicesController {

    async index(request: FastifyRequest, reply: FastifyReply) {
        try {
            const service = new ListAllInvoicesService()

            const invoices = await service.execute()
            
            reply.status(200).send(invoices)
        } catch (error) {
            console.error(error)
        }
    }

}

export default InvoicesController
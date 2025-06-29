import { logger } from "../providers/logger/index.ts"
import type { IOrderCreatedMessage } from '../../../interfaces/messages/IOrderCreatedMessage.ts'
import DrizzleOrmProvider from "../providers/drizzleOrm/index.ts"
import { invoicesTable } from "../database/schemas/invoices.ts"

type Invoice = typeof invoicesTable.$inferSelect;

class ListAllInvoicesService {
    async execute(): Promise<Invoice[]> {
        try {
            const db = DrizzleOrmProvider.getConnection()

            const invoices = await db.select().from(invoicesTable)

            return invoices
        } catch (error) {
            logger.error('Error occur on ListAllInvoicesService')
            throw error
        }
    }
}

export default ListAllInvoicesService
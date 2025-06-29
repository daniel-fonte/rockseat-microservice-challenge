import { logger } from "../providers/logger/index.ts"
import type { IOrderCreatedMessage } from '../../../interfaces/messages/IOrderCreatedMessage.ts'
import DrizzleOrmProvider from "../providers/drizzleOrm/index.ts"
import { invoicesTable } from "../database/schemas/invoices.ts"

class ProcessOrderService {
    async execute(order: IOrderCreatedMessage): Promise<void> {
        try {
            logger.info(`Processing Order: ${order.orderId}`)

            const db = DrizzleOrmProvider.getConnection()

            const orderToSave: typeof invoicesTable.$inferInsert = {
                orderId: order.orderId,
                customerId: order.customerId
            }

            const ordedSaved = await db.insert(invoicesTable).values(orderToSave).returning({ insertedId: invoicesTable.id });

            logger.info(`Order: ${ordedSaved[0].insertedId} stored on database`)
        } catch (error) {
            logger.error('Error occur on ProcessOrderService')
            throw error
        }
    }
}

export default ProcessOrderService
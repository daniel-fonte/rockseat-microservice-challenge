import { logger } from "../providers/logger/index.ts"
import type { IOrderCreatedMessage } from '../../../interfaces/messages/IOrderCreatedMessage.ts'

class ProcessOrderService {
    async execute(order: IOrderCreatedMessage): Promise<void> {
        try {
            logger.info(`Processing Order: ${order.orderId}`)
        } catch (error) {
            logger.error('Error occur on ProcessOrderService')
            throw error
        }
    }
}

export default ProcessOrderService
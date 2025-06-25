import { z } from 'zod'

export const createOrderSchema = z.object({
  customerId: z.string().uuid(),
  amount: z.number()
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
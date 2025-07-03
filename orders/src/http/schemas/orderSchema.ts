import { FastifySchema } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  customerId: z.string().uuid(),
  amount: z.number()
})

export type CreateOrderBodyRequest = z.infer<typeof bodySchema>

const responseSchema = z.object({
  orderId: z.string().uuid()
})

export type CreateOrderBodyReply = z.infer<typeof responseSchema>

export const schema: FastifySchema = {
  body: bodySchema,
  response: {
    201: responseSchema
  }
}
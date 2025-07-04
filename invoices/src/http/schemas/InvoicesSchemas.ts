import { FastifySchema } from 'fastify'
import { z } from 'zod'

const responseObject = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  orderId: z.string().uuid(),
  updated_at: z.string().datetime(),
  created_at: z.string().datetime(),
  deleted_at: z.string().datetime().nullable()
})

const responseSchema = z.array(responseObject)

export const schema: FastifySchema = {
  response: {
    200: responseSchema
  }
}
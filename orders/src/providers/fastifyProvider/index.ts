import fastify, { FastifyInstance } from 'fastify'
import { logger } from '../logger/index.ts'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { Logger } from 'pino'

class FastifyProvider {
    private static instance: FastifyProvider | null = null
    private static serverInstace: FastifyInstance<Server<typeof IncomingMessage, typeof ServerResponse>, IncomingMessage, ServerResponse<IncomingMessage>, Logger<never, boolean>, ZodTypeProvider> | null = null

    private constructor() {}

    static getInstance(): FastifyProvider {
        if (!FastifyProvider.instance) {
            FastifyProvider.instance = new FastifyProvider()
            FastifyProvider.instance.createServer()
        }
        
        return FastifyProvider.instance
    }

    private createServer() {
        try {
            const app = fastify({ 
                loggerInstance: logger
            }).withTypeProvider<ZodTypeProvider>()

            app.setSerializerCompiler(serializerCompiler)
            app.setValidatorCompiler(validatorCompiler)

            app.register(fastifyCors, { origin: '*' })

            FastifyProvider.serverInstace = app
        } catch (error) {
            logger.error('Server not created.', error)
            throw error
        }
    }

    static getServerInstace() {
        if (!FastifyProvider.serverInstace) {
            throw new Error('FastifyProvider connection not initialized.')
        }

        return FastifyProvider.serverInstace
    }
}

export default FastifyProvider

import routes from './routes.ts'
import { ENV } from '../env.ts'
import FastifyProvider from '../providers/fastifyProvider/index.ts'

export const server = {
    async initialize() {
        const app = FastifyProvider.getServerInstance()

        app.register(routes)

        app.listen({ host: ENV.HOST, port: ENV.PORT }).then(() => {
            app.log.info('HTTP Server Running...')
        })
    }
}
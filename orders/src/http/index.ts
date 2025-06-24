import routes from './routes.ts'
import { ENV } from '../env.ts'
import FastifyProvider from '../providers/fastifyProvider/index.ts'

FastifyProvider.getInstance()

const app = FastifyProvider.getServerInstace()

app.register(routes)

export const server = {
    initialize() {
        app.listen({ host: ENV.HOST, port: ENV.PORT }).then(() => {
            app.log.info('HTTP Server Running...')
        })
    }
}
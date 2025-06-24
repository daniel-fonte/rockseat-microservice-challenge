import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { logger } from '../logger/index.ts'
import { Pool } from 'pg'
import { ENV } from '../../env.ts'

class DrizzleOrmProvider {
    private static instace: DrizzleOrmProvider | null = null
    private static connection: NodePgDatabase | null = null

    private constructor() {}

    static async getInstace(): Promise<DrizzleOrmProvider> {
        if(!DrizzleOrmProvider.instace) {
            DrizzleOrmProvider.instace = new DrizzleOrmProvider()
            await DrizzleOrmProvider.instace.connect()
        }

        return DrizzleOrmProvider.instace
    }

    async connect() {
        try {
            const pool = new Pool({
                connectionString: ENV.DATABASE_URL,
                application_name: 'orders_service',
                max: 5
            })

            const db = drizzle({ client: pool })

            await db.execute('SELECT 1')

            DrizzleOrmProvider.connection = db

            logger.info('Database connected.')
        } catch (error) {
            logger.error('Database not connected.')
        }
    }

    static getConnection(): NodePgDatabase {
        if (!DrizzleOrmProvider.connection) {
            throw new Error('Database connection not initialized.')
        }

        return DrizzleOrmProvider.connection
    }
}

export default DrizzleOrmProvider
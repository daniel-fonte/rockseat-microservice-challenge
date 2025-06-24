declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'DEV' | 'STAGING' | 'PRD';
            LOG_LEVEL: 'debug' | 'info'
            PORT: number;
            HOST: string;
            DATABASE_URL: string;
            BROKER_URL: string;
        }
    }
}
export {}
  
  
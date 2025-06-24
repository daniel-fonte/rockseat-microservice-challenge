function getEnvVar(name: string): string {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Enviroment variable ${name} must be set.`);
    }

    return value;
}

export const ENV = {
    NODE_ENV: getEnvVar('NODE_ENV'),
    HOST: getEnvVar('HOST'),
    PORT: parseInt(getEnvVar('PORT')),
    LOG_LEVEL: getEnvVar('LOG_LEVEL'),
    DATABASE_URL: getEnvVar('DATABASE_URL'),
    BROKER_URL: getEnvVar('BROKER_URL')
};
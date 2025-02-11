import dotenv from "dotenv";

dotenv.config();

export const config = {
    application: {
        port: process.env.PORT!
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL!,
        user: process.env.RABBITMQ_USER!,
        password: process.env.RABBITMQ_PASSWORD!
    },
    postgres: {
        connectionString: process.env.POSTGRES_CONNECTIONSTRING!
    }
}
require('dotenv').config();

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        },
        migrations: {
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds'
        },
    },

    testing: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_TESTING
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        }
    },

    production: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        },
    }
};

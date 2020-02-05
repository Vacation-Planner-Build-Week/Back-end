require('dotenv').config();

module.exports = {

    development: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds'
        },
    },

    testing: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL_TESTING,
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

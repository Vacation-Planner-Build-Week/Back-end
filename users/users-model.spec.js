require('dotenv').config();
const db = require('../database/dbConfig.js');
const Users = require('./users-model');
const cleaner = require('knex-cleaner');

const newUser = {
    user_name: 'jacob',
    user_password: 'aaaa'
};

describe('users model', () => {

    describe('test env', () => {
        it('', () => {
            expect(process.env.DB_ENV).toBe('localtesting');
        });
    });
    describe('insert', () => {
        beforeEach(() => {
            return cleaner.clean(db, {
                ignoreTables: ['knex_migrations', 'knex_migrations_lock']
            });
        });
        it('adds a new user', async () => {
            await Users.add(newUser);
            const users = await db('users');
            expect(users).toHaveLength(1);
        });
    });
    describe('delete user', () => {
        beforeEach(() => {
            return cleaner.clean(db, {
                ignoreTables: ['knex_migrations', 'knex_migrations_lock']
            });
        });
        it('adds a new user then deletes it', async () => {
            const user = await Users.add(newUser);
            expect(user.user_name).toBe('jacob');
            await Users.remove(user.user_id);
            const users = await db('users');
            expect(users).toHaveLength(0);
        });
    });
});
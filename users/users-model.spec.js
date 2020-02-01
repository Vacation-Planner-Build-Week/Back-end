const db = require('../database/dbConfig.js');
const Users = require('./users-model');
const cleaner = require('knex-cleaner');

const newUser = {
    userName: 'jacob',
    userPassword: 'aaaa'
};

describe('users model', () => {

    describe('test env', () => {
        it('', () => {
            expect(process.env.DB_ENV).toBe('testing');
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
            expect(user.userName).toBe('jacob');
            await Users.remove(user.userId);
            const users = await db('users');
            expect(users).toHaveLength(0);
        });
    });
});
const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig.js');
const cleaner = require('knex-cleaner');

let token;

const user = {
    userName: "jacob washburn",
    userPassword: "password"
};

describe('server', () => {

    describe('test env', () => {
        it('', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    });
    it('runs the server', () => {
        expect(true).toBe(true);
    });
    describe('get /', () => {
        it('should return 200 ok', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it('should return api: Api is running', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.api).toBe('Api running');
                });
        });
        it('content type should be json', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('application/json');
                });
        });
    });
});

describe('register', () => {
    beforeEach(async () => {
        await cleaner.clean(db, {
            ignoreTables: ['knex_migrations', 'knex_migrations_lock']
        });
    });
    it('should return status 201', () => {
        return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.userName).toBe(user.userName);
            });
    });
    it('password has been changed/hashed', () => {
        return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                expect(res.body.userPassword.length).toBeGreaterThan(user.userPassword.length);
            });
    });
});

describe('login', () => {
    it('should return message: Welcome jacob washburn', () => {
        return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.body.message).toBe(`Welcome ${user.userName}!`);
            });
    });
    it('status should be 200', () => {
        return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(200);
            });
    });
    it('should get a token', () => {
        return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.body.token).toBeDefined();
                token = res.body.token;
            });

    });
});

describe('users', () => {

    it('get all users length should be 1', () => {
        return request(server)
            .get('/api/users')
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.users).toBeDefined();
                expect(res.body.users.length).toBe(1);
            });
    });
    it('first username should === user.username', () => {
        return request(server)
            .get('/api/users')
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.users).toBeDefined();
                expect(res.body.users[0].userName).toBeDefined();
                expect(res.body.users[0].userName).toBe(user.userName);
            });
    });
    // it('')

});


const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig.js');
const cleaner = require('knex-cleaner');

let token;

const user = {
    user_name: "jacob washburn",
    user_password: "password"
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
                    expect(res.body.user_name).toBeDefined();
                    expect(res.body.user_name).toBe(user.user_name);
                });
        });
    });

    describe('login', () => {
        it('should return message: Welcome jacob washburn', () => {
            return request(server)
                .post('/api/auth/login')
                .send(user)
                .then(res => {
                    expect(res.body.message).toBe(`Welcome ${user.user_name}!`);
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
        it('first user name should === user.user_name', () => {
            return request(server)
                .get('/api/users')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.users).toBeDefined();
                    expect(res.body.users[0].user_name).toBeDefined();
                    expect(res.body.users[0].user_name).toBe(user.user_name);
                });
        });

    });
    describe('vacations', () => {

        beforeEach(async () => {
            await db.seed.run();
            const users = await db('users');
            const vacations = await db('vacations');
            const activities = await db('activities');
            const places = await db('places');
            const comments = await db('comments');
            expect(users).toBeDefined();
            expect(vacations).toBeDefined();
            expect(activities).toBeDefined();
            expect(places).toBeDefined();
            expect(comments).toBeDefined();

        });

        it('should get single user & vacation info', async () => {
            return request(server)
                .get('/api/users/1')
                .set('Authorization', token)
                .then(res => {
                    const {user, vacations} = res.body;
                    const {comments, activities, users, places, dates} = vacations[0];
                    expect(user).toBeDefined();
                    expect(user.user_name).toBeDefined();
                    expect(user.user_id).toBeDefined();
                    expect(vacations).toBeDefined();
                    expect(vacations).toHaveLength(2);

                    expect(user.user_name).toBe('jacob');
                    expect(user.user_id).toBe(1);

                    expect(vacations[0].vacation_id).toBe(1);
                    expect(vacations[0].vacation_name).toBe('summer');

                    expect(comments).toBeDefined();
                    expect(comments).toHaveLength(1);
                    expect(comments[0].comment_id).toBe(1);
                    expect(comments[0].comment).toBe('do really want to take time off of work?');
                    expect(comments[0].vacation_id).toBe(1);

                    expect(activities).toBeDefined();
                    expect(activities).toHaveLength(1);
                    expect(activities[0].activity_id).toBe(1);
                    expect(activities[0].activity_description).toBe('skydiving');
                    expect(activities[0].vacation_id).toBe(1);

                    expect(users).toBeDefined();
                    expect(users).toHaveLength(1);
                    expect(users[0].user_id).toBe(1);
                    expect(users[0].user_name).toBe('jacob');

                    expect(places).toBeDefined();
                    expect(places).toHaveLength(3);
                    expect(places[0].places_id).toBe(1);
                    expect(places[0].location).toBe('the zoo');
                    expect(places[0].vacation_id).toBe(1);
                    expect(places[1].places_id).toBe(2);
                    expect(places[1].location).toBe('the park');
                    expect(places[1].vacation_id).toBe(1);
                    expect(places[2].places_id).toBe(3);
                    expect(places[2].location).toBe('the waterpark');
                    expect(places[2].vacation_id).toBe(1);

                    expect(dates).toBeDefined();
                    expect(dates).toHaveLength(2);
                    expect(dates[0].date_id).toBe(1);
                    expect(dates[0].start_date).toBe('2020-06-01T06:00:00.000Z');
                    expect(dates[0].end_date).toBe('2020-06-14T06:00:00.000Z');
                    expect(dates[0].vacation_id).toBe(1);
                    expect(dates[1].date_id).toBe(2);
                    expect(dates[1].start_date).toBe('2020-07-15T06:00:00.000Z');
                    expect(dates[1].end_date).toBe('2020-07-25T06:00:00.000Z');
                    expect(dates[1].vacation_id).toBe(1);
                });
        });

    });
});

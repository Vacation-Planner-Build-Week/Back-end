require('dotenv').config();
const db = require('../database/dbConfig.js');
const Activities = require('./activities_model');
const cleaner = require('knex-cleaner');

const newActivity = {
    activity_description: "yahoo",
    time_start: "12:00:00",
    time_end: "12:30:00",
    vacation_id: 1
};

const vacation = {
    vacation_name: 'pool house',
    vacation_description: 'lets have a pool party'
};

describe('activities model', () => {
    process.env.DB_ENV = 'testing';

    describe('test env', () => {
        it('', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    });
    describe('insert', () => {
        beforeEach(() => {
            cleaner.clean(db, {
                ignoreTables: ['knex_migrations', 'knex_migrations_lock']
            });

        });
        it('adds a new activity', async () => {
            await db('vacations').insert(vacation);
            await Activities.add(newActivity);
            const activities = await db('activities');
            expect(activities).toHaveLength(1);
        });
    });
    describe.skip('delete activity', () => {
        beforeEach(() => {
            return cleaner.clean(db, {
                ignoreTables: ['knex_migrations', 'knex_migrations_lock']
            });
        });
        it('adds a new activity then deletes it', async () => {
            const activity = await activities.add(newActivity);
            expect(activity.activity_description).toBe('jacob');
            await Activities.remove(activity.activity_id);
            const activities = await db('activities');
            expect(activities).toHaveLength(0);
        });
    });
});
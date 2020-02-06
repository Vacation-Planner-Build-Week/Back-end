require('dotenv').config();
const db = require('../database/dbConfig.js');
const Activities = require('./activities_model');
const cleaner = require('knex-cleaner');

const newActivities = [
    {
        activity_description: "yahoo",
        time_start: "12:00:00",
        time_end: "12:30:00",
        vacation_id: 1
    },
    {
        activity_description: "the beach",
        time_start: "12:00:00",
        time_end: "12:30:00",
        vacation_id: 1
    },
    {
        activity_description: "south seas",
        time_start: "12:00:00",
        time_end: "12:30:00",
        vacation_id: 1
    }
];

const activity1 = {
    activity_description: "pizza",
    time_start: "12:00:00",
    time_end: "12:30:00",
    vacation_id: 1
};

const vacation = {
    vacation_name: 'pool house',
    vacation_description: 'lets have a pool party'
};

describe('activities model', () => {

    beforeEach(async () => {
        await db('vacations').insert(vacation);
        await db('activities').insert(newActivities);
        const activities = await db('activities');
    });

    afterEach(() => {
        return cleaner.clean(db, {
            ignoreTables: ['knex_migrations', 'knex_migrations_lock']
        });
    });

    describe('test env', () => {
        it('', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    });
    describe('insert', () => {

        it('adds a new activity', async () => {
            await Activities.add(activity1);
            const activities = await db('activities');
            expect(activities).toHaveLength(4);
        });
    });
    describe('delete activity', () => {

        it('deletes activity', async () => {
            const activity = await Activities.findBy({activity_description: 'yahoo'});
            expect(activity.activity_description).toBe('yahoo');
            expect(activity.vacation_id).toBe(1);
            await Activities.remove(1);
            const activities = await db('activities');
            expect(activities).toHaveLength(2);
            expect(activities[0].activity_description).toBe("the beach");
            expect(activities[1].activity_description).toBe("south seas");
        });
    });
    describe('update activity', () => {

        it('should update activity by id', async () => {
            const activity = await db('activities').where('activity_description', newActivities[0].activity_description).first();
            expect(activity).toBeDefined();
            expect(activity.activity_description).toBe(newActivities[0].activity_description)
            expect(activity.activity_id).toBeDefined();
            expect(activity.activity_id).toBe(1);
            activity.activity_description = 'changed';
            const changes = await Activities.update(activity.activity_id, activity);
            expect(changes.activity_description).toBe('changed')
        });
    })
});
const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

function find() {
    return db('activities');
}

function findBy(filter) {
    return db('activities')
        .where(filter)
        .first();
}

async function add(activity) {
    const [activity_id] = await db('activities').insert(activity, 'activity_id');
    return findById(activity_id)
}

function findById(activity_id) {
    return db('activities')
        .where({activity_id})
        .first();
}

function remove(activity_id) {
    return db('activities')
        .where({activity_id})
        .del();
}
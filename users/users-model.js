const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

function find() {
    return db('users');
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .first();
}

async function add(user) {
    const [user_id] = await db('users').insert(user, 'user_id');
    return findById(user_id)
}

function findById(user_id) {
    return db('users')
        .where({user_id})
        .first();
}

function remove(user_id) {
    return db('users')
        .where({user_id})
        .del();
}
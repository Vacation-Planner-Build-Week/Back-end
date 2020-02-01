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
    const [userId] = await db('users').insert(user, 'userId');
    return findById(userId)
}

function findById(userId) {
    return db('users')
        .where({userId})
        .first();
}

function remove(userId) {
    return db('users')
        .where({userId})
        .del();
}
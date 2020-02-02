const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

function find() {
    return db('vacations');
}

function findBy(filter) {
    return db('messages')
        .where(filter)
        .first();
}

async function add(message) {
    const [message_id] = await db('messages').insert(message, 'message_id');
    return findById(message_id)
}

function findById(message_id) {
    return db('messages')
        .where({message_id})
        .first();
}

function remove(message_id) {
    return db('messages')
        .where({message_id})
        .del();
}
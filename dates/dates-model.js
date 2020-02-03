const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    edit
};

function find() {
    return db('dates');
}

function findBy(filter) {
    return db('dates')
        .where(filter)
        .first();
}

async function add(date) {
    const [date_id] = await db('dates').insert(date, 'date_id');
    return findById(date_id)
}

function findById(date_id) {
    return db('dates')
        .where({date_id})
        .first();
}

function remove(date_id) {
    return db('dates')
        .where({date_id})
        .del();
}

function edit(date) {
    return db('dates')
        .update(date);
}
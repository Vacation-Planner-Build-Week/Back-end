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
    return db('vacations')
        .where(filter)
        .first();
}

async function add(vacation) {
    const [vacation_id] = await db('vacations').insert(vacation, 'vacation_id');
    return findById(vacation_id)
}

function findById(vacation_id) {
    return db('vacations')
        .where({vacation_id})
        .first();
}

function remove(vacation_id) {
    return db('vacations')
        .where({vacation_id})
        .del();
}
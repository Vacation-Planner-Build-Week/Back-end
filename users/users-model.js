const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    findVacationsForUser,
    findUserMessages,
    findUserComments,

};

function find() {
    return db('users')
        .select('user_id','user_name');
}

function findBy(filter) {
    return db('users')
        .select('user_id','user_name')
        .where(filter)
        .first();
}

async function add(user) {
    const [user_id] = await db('users').insert(user, 'user_id');
    return findById(user_id);
}

function findById(user_id) {
    return db('users')
        .select('user_id','user_name')
        .where({user_id})
        .first();
}

function remove(user_id) {
    return db('users')
        .where({user_id})
        .del();
}

function findVacationsForUser(user_id) {
    return db('user_vacation as uv')
        .join('vacations as v', 'v.vacation_id', 'uv.vacation_id')
        .select('v.vacation_id', 'vacation_name', 'vacation_description')
        .where('user_id', user_id);
}

function findUserMessages(user_id) {
    return db('get_messages_for_user')
        .where({user_id})
}

function findUserComments(user_id) {
    return db('comments')
        .where({user_id})
}



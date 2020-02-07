const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    findVacationComments,
    findVacationPlaces,
    findVacationActivities,
    findVacationDates,
    findVacationUsers,
    addVacationUser,
    update,
    removeVacationUser
};

function find() {
    return db('vacations');
}

function findBy(filter) {
    return db('vacations')
        .where(filter)
        .first();
}

async function add(vacation, user_id) {
    const [vacation_id] = await db('vacations').insert(vacation, 'vacation_id');
    await db('user_vacation')
        .insert({user_id: user_id, vacation_id: vacation_id}, 'vacation_id')
        .then(ids => {
            const id = ids[0];
            return findById(id);
        });
    return findById(vacation_id);
}

function findById(vacation_id) {
    return db('vacations')
        .where({vacation_id})
        .first();
}

function findByIdandTable(id, table, returnId) {
    return db(table)
        .where(`${returnId}`, id)
        .first();
}

function remove(vacation_id) {
    return db('vacations')
        .where({vacation_id})
        .del();
}

async function removeVacationUser(vacation_id, user_id) {
    return db('user_vacation')
        .where({vacation_id})
        .andWhere({user_id})
        .del();
}

function findVacationComments(vacation_id) {
    return db('comments')
        .where({vacation_id});
}

function findVacationPlaces(vacation_id) {
    return db('places')
        .where({vacation_id});
}

function findVacationActivities(vacation_id) {
    return db('activities')
        .where({vacation_id});
}

function findVacationDates(vacation_id) {
    return db('dates')
        .where({vacation_id});
}

function findVacationUsers(vacation_id) {
    return db('user_vacation as uv')
        .join('vacations as v', 'v.vacation_id', 'uv.vacation_id')
        .join('users as u', 'uv.user_id', 'u.user_id')
        .select('uv.user_id','u.user_name')
        .where('uv.vacation_id', vacation_id);
}

function addVacationData(payload, table, returnId) {
    return db(table)
        .insert(payload, returnId)
        .then(ids => {
            const id = ids[0];
            return findByIdandTable(id, table, returnId);
        });
}

function addVacationUser(user) {
    return db('user_vacation')
        .insert(user, 'vacation_id')
        .then(ids => {
            const id = ids[0];
            return findById(id);
        });
}

function update(vacation_id, vacation) {
    return db('vacations')
        .where({vacation_id})
        .update(vacation)
        .then(count => {
            return count > 0 ? this.findById(vacation_id) : null;
        });
}

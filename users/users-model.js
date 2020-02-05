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
    findAllVacationInfo,
    findAllUserVacationDataById
};

function find() {
    return db('users')
        .select('user_id', 'user_name');
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .first();
}

async function add(user) {
    const [user_id] = await db('users').insert(user, 'user_id');
    return findById(user_id);
}

function findById(user_id) {
    return db('users')
        .where({user_id})
        .first();
}

async function findAllUserVacationDataById(user_id) {
    const user = await db('users').select('user_id', 'user_name').where({user_id}).first();
    const vacations = await findVacationsForUser(user_id)
        .then(vacations => {
            return Promise.all(vacations.map(async vacation => {
                const {vacation_id} = vacation;
                const comments = await db('comments')
                    .where({vacation_id});
                const activities = await db('activities')
                    .where({vacation_id});
                const dates = await db('dates')
                    .where({vacation_id});
                const places = await db('places')
                    .where({vacation_id});
                const users = await db('vacations as v')
                    .join('user_vacation as uv', 'v.vacation_id', 'uv.vacation_id')
                    .join('users', 'uv.user_id', 'users.user_id')
                    .select('uv.user_id', 'users.user_name')
                    .where('uv.vacation_id', vacation_id);
                return {
                    ...vacation,
                    comments: comments,
                    activities: activities,
                    dates: dates,
                    places: places,
                    users: users
                };
            }));
        });
    return {
        ...user,
        vacations: vacations
    }

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
        .where('uv.user_id', user_id);
}

function findUserMessages(user_id) {
    return db('get_messages_for_user')
        .where({user_id});
}

function findUserComments(user_id) {
    return db('comments')
        .where({user_id});
}

function findAllVacationInfo(user_id) {
    return findVacationsForUser(user_id)
        .then(vacations => {
            return Promise.all(vacations.map(async vacation => {
                const {vacation_id} = vacation;
                const comments = await db('comments')
                    .where({vacation_id});
                const activities = await db('activities')
                    .where({vacation_id});
                const dates = await db('dates')
                    .where({vacation_id});
                const places = await db('places')
                    .where({vacation_id});
                const users = await db('vacations as v')
                    .join('user_vacation as uv', 'v.vacation_id', 'uv.vacation_id')
                    .join('users', 'uv.user_id', 'users.user_id')
                    .select('uv.user_id', 'users.user_name')
                    .where('uv.vacation_id', vacation_id);
                return {
                    ...vacation,
                    comments: comments,
                    activities: activities,
                    dates: dates,
                    places: places,
                    users: users
                };
            }));
        });
}

//
// function findAllVacationInfo(user_id) {
//     return findVacationsForUser(user_id)
//         .then(vacations => {
//             // console.log('vacations',vacations);
//             return vacations.map(async (vacation, index) => {
//                 const {vacation_id} = vacation;
//                 console.log('map vacation', 'index', index, '\n', vacation);
//                 const data = await db('comments')
//                     .where({vacation_id})
//                     .then(comments => {
//                         return db('activities')
//                             .where({vacation_id})
//                             .then(activities => {
//                                 return db('dates')
//                                     .where({vacation_id})
//                                     .then(dates => {
//                                         return db('places')
//                                             .where({vacation_id})
//                                             .then(places => {
//                                                 return db('vacations as v')
//                                                     .join('user_vacation as uv', 'v.vacation_id', 'uv.vacation_id')
//                                                     .select('uv.user_id')
//                                                     .where('uv.vacation_id', vacation_id)
//                                                     .then(users => {
//
//                                                         return {
//                                                             ...vacation,
//                                                             comments: comments,
//                                                             activities: activities,
//                                                             dates: dates,
//                                                             places: places,
//                                                             users: users
//                                                         };
//                                                     });
//                                             });
//                                     });
//                             });
//                     });
//                 console.log('******************************** DATA\n',data,'******************************** DATA\n');
//                 return data
//             });
//         });
// }


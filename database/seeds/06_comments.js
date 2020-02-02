exports.seed = function (knex) {
    return knex('comments').insert([
        {comment: 'do really want to take time off of work?',vacation_id: 1, user_id: 1},
        {comment: 'do really want to take time off of work?',vacation_id: 3, user_id: 2},
        {comment: 'do really want to take time off of work?',vacation_id: 2, user_id: 1},
        {comment: 'do really want to take time off of work?',vacation_id: 4, user_id: 2},
    ]);
};
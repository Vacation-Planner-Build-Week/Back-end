exports.seed = function (knex) {
    return knex('user_vacation').insert([
        {user_id: 1,vacation_id:1},
        {user_id: 1,vacation_id:2},
        {user_id: 2,vacation_id:3},
        {user_id: 2,vacation_id:4},
    ]);
};
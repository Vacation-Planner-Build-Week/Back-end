exports.seed = function (knex) {
    return knex('message_user').insert([
        {message_id: 1, user_id: 1, sender: true, receiver: false},
        {message_id: 1, user_id: 2, sender: false, receiver: true},
        {message_id: 2, user_id: 2, sender: true, receiver: false},
        {message_id: 2, user_id: 1, sender: false, receiver: true},
        {message_id: 3, user_id: 1, sender: true, receiver: false},
        {message_id: 3, user_id: 2, sender: false, receiver: true},
        {message_id: 4, user_id: 2, sender: true, receiver: false},
        {message_id: 4, user_id: 1, sender: false, receiver: true}
    ]);
};

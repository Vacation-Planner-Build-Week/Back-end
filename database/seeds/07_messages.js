exports.seed = function (knex) {
    return knex('messages').insert([
        {message: 'hello jumpy!'},
        {message: 'hi jake! hows it going?'},
        {message: 'good. how are you?'},
        {message: 'im doing great! thanks for asking.'}

    ]);
};

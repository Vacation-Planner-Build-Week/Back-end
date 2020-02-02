exports.up = async function (knex) {
    return knex.schema.createTable('messages', tbl => {
        tbl.increments('message_id');
        tbl.string('message', 250)
            .notNullable();
        tbl.timestamps(true, true);
    });
};

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists('messages');
};

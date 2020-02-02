exports.up = async function(knex) {
    return knex.schema.createTable('message_user', tbl => {
        tbl.increments();
        tbl.integer('message_id')
            .unsigned()
            .references('message_id')
            .inTable('messages')
            .onUpdate('CASCADE')
            .notNullable();
        tbl.integer('user_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .notNullable();
        tbl.boolean('sender')
            .defaultTo(false)
            .notNullable();
        tbl.boolean('receiver')
            .defaultTo(false)
            .notNullable();
        tbl.timestamps(true,true);
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('message_user')
};

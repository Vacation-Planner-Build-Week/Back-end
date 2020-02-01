exports.up = async function(knex) {
    return knex.schema.createTable('messages', tbl => {
        tbl.increments('messageId');
        tbl.string('message', 250)
            .notNullable();
        tbl.integer('senderId')
            .unsigned()
            .references('userId')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
        tbl.integer('receiverId')
            .unsigned()
            .references('userId')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('messages')
};

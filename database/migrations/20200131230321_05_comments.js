exports.up = async function(knex) {
    return knex.schema.createTable('comments', tbl => {
        tbl.increments('commentId');
        tbl.string('comment', 250)
            .notNullable();
        tbl.integer('vacationId')
            .unsigned()
            .references('vacationId')
            .inTable('vacations')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
        tbl.integer('userId')
            .unsigned()
            .references('userId')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('comments')
};

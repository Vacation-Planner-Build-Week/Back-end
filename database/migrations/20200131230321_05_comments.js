exports.up = async function(knex) {
    return knex.schema.createTable('comments', tbl => {
        tbl.increments('comment_id');
        tbl.string('comment', 250)
            .notNullable();
        tbl.integer('vacation_id')
            .unsigned()
            .references('vacation_id')
            .inTable('vacations')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
        tbl.integer('user_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
        tbl.timestamps(true,true);
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('comments')
};

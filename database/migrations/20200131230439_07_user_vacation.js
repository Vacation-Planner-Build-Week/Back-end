exports.up = async function(knex) {
    return knex.schema.createTable('user_vacation', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .notNullable();
        tbl.integer('vacation_id')
            .unsigned()
            .references('vacation_id')
            .inTable('vacations')
            .onUpdate('CASCADE')
            .notNullable();
        tbl.timestamps(true,true);
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('user_vacation')
};

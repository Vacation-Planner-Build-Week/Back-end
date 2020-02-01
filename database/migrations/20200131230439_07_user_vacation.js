exports.up = async function(knex) {
    return knex.schema.createTable('user_vacation', tbl => {
        tbl.increments();
        tbl.integer('userId')
            .unsigned()
            .references('userId')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
        tbl.integer('vacationId')
            .unsigned()
            .references('vacationId')
            .inTable('vacations')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('user_vacation')
};

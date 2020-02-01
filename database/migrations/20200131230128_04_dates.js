exports.up = async function(knex) {
    return knex.schema.createTable('dates', tbl => {
        tbl.increments('dateId');
        tbl.date('startDate')
            .notNullable();
        tbl.date('endDate')
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
    return knex.schema.dropTableIfExists('dates')
};

exports.up = async function(knex) {
    return knex.schema.createTable('activities', tbl => {
        tbl.increments('activityId');
        tbl.string('activityDescription', 250)
            .notNullable();
        tbl.time('timeStart');
        tbl.time('timeEnd');
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
    return knex.schema.dropTableIfExists('activities')
};

exports.up = async function(knex) {
    return knex.schema.createTable('activities', tbl => {
        tbl.increments('activity_id');
        tbl.string('activity_description', 250)
            .notNullable();
        tbl.time('time_start');
        tbl.time('time_end');
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
    return knex.schema.dropTableIfExists('activities')
};

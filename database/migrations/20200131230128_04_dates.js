exports.up = async function(knex) {
    return knex.schema.createTable('dates', tbl => {
        tbl.increments('date_id');
        tbl.date('start_date')
            .notNullable();
        tbl.date('end_date')
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
    return knex.schema.dropTableIfExists('dates')
};

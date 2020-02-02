exports.up = async function(knex) {
    return knex.schema.createTable('places', tbl => {
        tbl.increments('places_id');
        tbl.string('location', 60)
            .notNullable();
        tbl.integer('days_in_location');
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
    return knex.schema.dropTableIfExists('places')
};

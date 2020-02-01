exports.up = async function(knex) {
    return knex.schema.createTable('places', tbl => {
        tbl.increments('placesId');
        tbl.string('location', 60)
            .notNullable();
        tbl.integer('dayInLocation');
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
    return knex.schema.dropTableIfExists('places')
};

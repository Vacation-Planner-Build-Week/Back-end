exports.up = async function(knex) {
    return knex.schema.createTable('vacations', tbl => {
        tbl.increments('vacationId');
        tbl.string('vacationName', 60)
            .notNullable();
        tbl.string('vacationDescription', 250)
            .notNullable();
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('vacations')
};

exports.up = async function(knex) {
    return knex.schema.createTable('vacations', tbl => {
        tbl.increments('vacation_id');
        tbl.string('vacation_name', 60)
            .notNullable();
        tbl.string('vacation_description', 250)
            .notNullable();
        tbl.timestamps(true,true);
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('vacations')
};

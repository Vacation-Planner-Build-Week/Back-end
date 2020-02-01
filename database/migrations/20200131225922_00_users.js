exports.up = async function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('userId');
        tbl.string('userName', 80)
            .notNullable();
        tbl.string('userPassword', 250)
            .notNullable();
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('users')
};

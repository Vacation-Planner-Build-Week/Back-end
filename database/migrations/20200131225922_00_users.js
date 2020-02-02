exports.up = async function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('user_id');
        tbl.string('user_name', 80)
            .notNullable();
        tbl.string('user_password', 250)
            .notNullable();
        tbl.timestamps(true,true);
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('users')
};

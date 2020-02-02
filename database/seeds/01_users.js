exports.seed = function (knex) {
    return knex('users').insert([
        {
            user_name: "jacob",
            user_password: "$2a$10$bVWquBPJAVd0eDQQDTNpGe9U6BsNxl2JKK2KHF3eZ1uZz4EqjHKeW"
        },
        {
            user_name: "jumpy",
            user_password: "$2a$10$fO5X7pfN2Z2XDElApn.Rf.zqI3XbC6M7cP7oU4LhufPDifFxP6lC6"
        }
    ]);
};

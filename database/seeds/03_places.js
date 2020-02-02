exports.seed = function (knex) {
    return knex('places').insert([
        {location: 'the zoo', days_in_location: 1, vacation_id: 1},
        {location: 'the park', days_in_location: 1, vacation_id: 1},
        {location: 'the waterpark', days_in_location: 1, vacation_id: 1},
        {location: 'figi', days_in_location: 1, vacation_id: 2},
        {location: 'the bahamas', days_in_location: 1, vacation_id: 2},
        {location: 'cousin ernies', days_in_location: 1, vacation_id: 2},
        {location: 'sanfransisco', days_in_location: 1, vacation_id: 3},
        {location: 'florida keys', days_in_location: 1, vacation_id: 3},
        {location: 'thailand', days_in_location: 1, vacation_id: 3},
        {location: 'grandmas', days_in_location: 1, vacation_id: 4},
        {location: 'the mountains', days_in_location: 1, vacation_id: 4},
        {location: 'australia', days_in_location: 1, vacation_id: 4},
    ]);
};
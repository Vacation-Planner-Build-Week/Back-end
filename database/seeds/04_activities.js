exports.seed = function (knex) {
    return knex('activities').insert([
        {activity_description: 'skydiving',time_start: '12:00:00',time_end: '12:30:00', vacation_id: 1},
        {activity_description: 'play in the leaves',time_start: '12:00:00',time_end: '12:30:00', vacation_id: 2},
        {activity_description: 'got to the beach',time_start: '12:00:00',time_end: '12:30:00', vacation_id: 3},
        {activity_description: 'sledding',time_start: '12:00:00',time_end: '12:30:00', vacation_id: 4}
    ]);
};

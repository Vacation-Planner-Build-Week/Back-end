exports.seed = function (knex) {
    return knex('vacations').insert([
        {vacation_name: 'summer', vacation_description: 'after school is out!'},
        {vacation_name: 'fall break', vacation_description: 'lets go somewhere fun!'},
        {vacation_name: 'spring break', vacation_description: 'time to party!'},
        {vacation_name: 'christmas', vacation_description: 'time to play in the snow or go somewhere warm!'}
    ]);
};

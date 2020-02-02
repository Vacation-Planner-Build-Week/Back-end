exports.seed = function (knex) {
    return knex('dates').insert([
        {start_date: '2020-06-01',end_date: '2020-06-14',vacation_id: 1},
        {start_date: '2020-07-15',end_date: '2020-07-25',vacation_id: 1},
        {start_date: '2020-11-20',end_date: '2020-11-27',vacation_id: 2},
        {start_date: '2020-11-18',end_date: '2020-11-28',vacation_id: 2},
        {start_date: '2020-03-21',end_date: '2020-03-26',vacation_id: 3},
        {start_date: '2020-03-15',end_date: '2020-03-19',vacation_id: 3},
        {start_date: '2020-12-21',end_date: '2020-12-26',vacation_id: 4},
        {start_date: '2020-12-21',end_date: '2021-01-01',vacation_id: 4},
    ]);
};

const router = require('express').Router();
const db = require('./vacations-model');

router.get('/', (req, res) => {
    db.find()
        .then(vacations => {
            if (vacations) {
                res.status(200).json({vacations});
            } else {
                res.status(404).json({message: 'There are no vacations in the  database.'});
            }
        })
        .catch(error => {
            console.log('get all comments error', error);
            res.status(500).json({message: 'There was an error getting vacations.'});
        });
});

router.get('/:id', (req, res) => {
    const vacation_id = req.params.id;
    db.findById(vacation_id)
        .then(vacation => {
            if (vacation) {
                res.status(200).json({vacation});
            } else {
                res.status(404).json({message: 'There is no vacation in the database with that id.'});
            }
        })
        .catch(error => {
            console.log('get vacation by id error', error);
            res.status(500).json({message: 'There was an error getting vacation by id.'});
        });
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findVacationComments(id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({message: 'There are no comments for that id.'});
            }
        })
        .catch(error => {
            console.log('get comments by id error', error);
            res.status(500).json({message: 'There was an error getting comments by id.'});
        });
});

router.get('/:id/dates', (req, res) => {
    const id = req.params.id;
    db.findVacationDates(id)
        .then(dates => {
            if (dates) {
                res.status(200).json(dates);
            } else {
                res.status(404).json({message: 'There are no dates for that id.'});
            }
        })
        .catch(error => {
            console.log('get dates by id error', error);
            res.status(500).json({message: 'There was an error getting dates by id.'});
        });
});

router.get('/:id/activities', (req, res) => {
    const id = req.params.id;
    db.findVacationActivities(id)
        .then(activities => {
            if (activities) {
                res.status(200).json(activities);
            } else {
                res.status(404).json({message: 'There are no activities for that id.'});
            }
        })
        .catch(error => {
            console.log('get activities by id error', error);
            res.status(500).json({message: 'There was an error getting activities by id.'});
        });
});

router.get('/:id/places', (req, res) => {
    const id = req.params.id;
    db.findVacationPlaces(id)
        .then(places => {
            if (places) {
                res.status(200).json(places);
            } else {
                res.status(404).json({message: 'There are no places for that id.'});
            }
        })
        .catch(error => {
            console.log('get places by id error', error);
            res.status(500).json({message: 'There was an error getting places by id.'});
        });
});

router.get('/:id/users', (req, res) => {
    const id = req.params.id;
    db.findVacationUsers(id)
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({message: 'There are no users for that id.'});
            }
        })
        .catch(error => {
            console.log('get users by id error', error);
            res.status(500).json({message: 'There was an error getting users by id.'});
        });
});

router.post('/', (req, res) => {
    const newVacation = req.body;
    const {user_id} = req.user;
    db.add(newVacation, user_id)
        .then(vacation => {
            if (vacation) {
                res.status(200).json(vacation);
            } else {
                res.status(404).json({message: 'Could not add that vacation.'});
            }
        })
        .catch(error => {
            console.log('add vacation error', error);
            res.status(500).json({message: 'There was an error adding vacation.'});
        });
});

router.post('/adduser', (req, res) => {
    const user = req.body;
    db.addVacationUser(user)
        .then(vacation => {
            if (vacation) {
                res.status(200).json({message: `User added to ${vacation.vacation_name} vacation.`});
            } else {
                res.status(404).json({message: 'Could not add that user to vacation.'});
            }
        })
        .catch(error => {
            console.log('add user to vacationerror', error);
            res.status(500).json({message: 'There was an error adding user to vacation.'});
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedVacation = req.body;
    db.update(id, updatedVacation)
        .then(vacation => {
            if (vacation) {
                res.status(201).json(vacation);
            } else {
                res.status(500).json({message: 'Could not update that vacation'});
            }
        })
        .catch(error => {
            console.log('update vacation error', error);
            res.status(500).json({message: 'There was an error updating vacation by id.'});
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({message: 'The vacation was successfully removed.'});
            } else {
                res.status(500).json({message: 'The vacation could not be removed because it did not exist in the database.'});
            }
        })
        .catch(error => {
            console.log('delete vacation error', error);
            res.status(500).json({message: 'There was an error removing a vacation.'});
        });
});

module.exports = router;
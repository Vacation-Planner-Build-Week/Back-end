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

module.exports = router;
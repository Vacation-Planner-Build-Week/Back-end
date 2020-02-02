const router = require('express').Router();
const db = require('./dates-model');

router.get('/', (req, res) => {
    db.find()
        .then(dates => {
            if (dates) {
                res.status(200).json({dates});
            } else {
                res.status(404).json({message: 'There are no dates in the  database.'});
            }
        })
        .catch(error => {
            console.log('get all comments error', error);
            res.status(500).json({message: 'There was an error getting dates.'});
        });
});

router.get('/:id', (req, res) => {
    const date_id = req.params.id;
    db.findById(date_id)
        .then(date => {
            if (date) {
                res.status(200).json({date});
            } else {
                res.status(404).json({message: 'There is no date in the database with that id.'});
            }
        })
        .catch(error => {
            console.log('get date by id error', error);
            res.status(500).json({message: 'There was an error getting date by id.'});
        });
});

module.exports = router;
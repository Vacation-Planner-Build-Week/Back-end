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

router.post('/', (req, res) => {
    const newDate = req.body;
    db.add(newDate)
        .then(date => {
            if (date) {
                res.status(201).json(date);
            } else {
                res.status(500).json({message: 'Could not add that date'});
            }
        })
        .catch(error => {
            console.log('add a new date error', error);
            res.status(500).json({message: 'There was an error adding a date.'});
        });
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	db.remove(id)
        .then(count => {
            if (count) {
            	res.status(200).json({message: 'The date was successfully removed.'})
            } else {
            	res.status(500).json({message: 'The date could not be removed because it did not exist in the database.'})
            }
        })
        .catch(error => {
            console.log('delete date error', error);
            res.status(500).json({message: 'There was an error removing a date.'})
        })
});

router.put('/:id', (req, res) => {

	db.remove(id)
        .then(count => {
            if (count) {
            	res.status(200).json({message: 'The date was successfully removed.'})
            } else {
            	res.status(500).json({message: 'The date could not be removed because it did not exist in the database.'})
            }
        })
        .catch(error => {
            console.log('delete date error', error);
            res.status(500).json({message: 'There was an error removing a date.'})
        })
});

module.exports = router;
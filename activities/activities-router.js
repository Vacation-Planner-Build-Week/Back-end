const router = require('express').Router();
const db = require('./activities_model');

router.get('/', (req, res) => {
    db.find()
        .then(activities => {
            if (activities) {
                res.status(200).json({activities});
            } else {
                res.status(404).json({message: 'There are no activities in the database.'});
            }
        })
        .catch(error => {
            console.log('get all activities error', error);
            res.status(500).json({message: 'There was an error getting activities.'});
        });
});

router.get('/:id', (req, res) => {
    const activity_id = req.params.id;
    db.findById(activity_id)
        .then(activity => {
            if (activity) {
                res.status(200).json({activity});
            } else {
                res.status(404).json({message: 'There is no activity in the database with that id.'});
            }
        })
        .catch(error => {
            console.log('get activity by id error', error);
            res.status(500).json({message: 'There was an error getting activity by id.'});
        });
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const updatedActivity = req.body;
	db.update(id,updatedActivity)
        .then(activity => {
            if (activity) {
            	res.status(201).json(activity)
            } else {
            	res.status(500).json({message: 'Could not update that activity'})
            }
        })
        .catch(error => {
            console.log('update activity error', error);
            res.status(500).json({message: 'There was an error updating activity by id.'});
        });
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	db.remove(id)
        .then(count => {
            if (count) {
            	res.status(200).json({message: 'The activity was successfully removed.'})
            } else {
            	res.status(500).json({message: 'The activity could not be removed because it did not exist in the database.'})
            }
        })
        .catch(error => {
            console.log('delete activity error', error);
            res.status(500).json({message: 'There was an error removing a activity.'})
        })
});

router.post('/', (req, res) => {
    const newActivity = req.body;
    db.add(newActivity)
        .then(activity => {
            if (activity) {
                res.status(201).json(activity);
            } else {
                res.status(500).json({message: 'Could not add that activity'});
            }
        })
        .catch(error => {
            console.log('add a new activity error', error);
            res.status(500).json({message: 'There was an error adding an activity.'});
        });
});

module.exports = router;
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

module.exports = router;
const router = require('express').Router();
const db = require('../users/users-model');

router.get('/', (req, res) => {
    db.find()
        .then(users => {
            if (users) {
                res.status(200).json({users});
            } else {
                res.status(404).json({message: 'There are no users in the database.'});
            }
        })
        .catch(error => {
            console.log('get all users error', error);
            res.status(500).json({message: 'There was an error getting users.'});
        });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
        .then(user => {
            if (user) {
                res.status(200).json({user});
            } else {
                res.status(404).json({message: 'There is no user in the database with that id.'});
            }
        })
        .catch(error => {
            console.log('get user by id error', error);
            res.status(500).json({message: 'There was an error getting user by id.'});
        });
});

module.exports = router;
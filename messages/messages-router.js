const router = require('express').Router();
const db = require('./messages-model');

router.get('/', (req, res) => {
    db.find()
        .then(messages => {
            if (messages) {
                res.status(200).json({messages});
            } else {
                res.status(404).json({message: 'There are no messages in the  database.'});
            }
        })
        .catch(error => {
            console.log('get all comments error', error);
            res.status(500).json({message: 'There was an error getting messages.'});
        });
});

router.get('/:id', (req, res) => {
    const message_id = req.params.id;
    db.findById(message_id)
        .then(message => {
            if (message) {
                res.status(200).json({message});
            } else {
                res.status(404).json({message: 'There is no message in the database with that id.'});
            }
        })
        .catch(error => {
            console.log('get message by id error', error);
            res.status(500).json({message: 'There was an error getting message by id.'});
        });
});

module.exports = router;
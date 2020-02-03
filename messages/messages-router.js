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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedMessage = req.body;
    db.update(id, updatedMessage)
        .then(message => {
            if (message) {
                res.status(201).json(message);
            } else {
                res.status(500).json({message: 'Could not update that message'});
            }
        })
        .catch(error => {
            console.log('update message error', error);
            res.status(500).json({message: 'There was an error updating message by id.'});
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({message: 'The message was successfully removed.'});
            } else {
                res.status(500).json({message: 'The message could not be removed because it did not exist in the database.'});
            }
        })
        .catch(error => {
            console.log('delete message error', error);
            res.status(500).json({message: 'There was an error removing a message.'});
        });
});

router.post('/', (req, res) => {
    const newMessage = req.body;
    db.add(newMessage)
        .then(message => {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({message: 'Could not add that message.'});
            }
        })
        .catch(error => {
            console.log('add message error', error);
            res.status(500).json({message: 'There was an error adding message.'});
        });
});

module.exports = router;
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
    const user_id = req.params.id;
    db.findById(user_id)
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

router.get('/:userid/vacations', (req, res) => {
    const userid = req.params.userid;
    db.findAllVacationInfo(userid)
        .then(vacations => {
            if (vacations) {
                res.status(200).json(vacations);
            } else {
                res.status(404).json({message: 'There are no vacations for that user id.'});
            }
        })
        .catch(error => {
            console.log('get vacations by user_id error', error);
            res.status(500).json({message: 'There was an error getting vacations by user_id.'});
        });
});

router.get('/:userid/messages', (req, res) => {
    const userid = req.params.userid;
    db.findUserMessages(userid)
        .then(messages => {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({message: 'There are no messages for that user id.'});
            }
        })
        .catch(error => {
            console.log('get messages by user_id error', error);
            res.status(500).json({message: 'There was an error getting messages by user_id.'});
        });
});

router.get('/:userid/comments', (req, res) => {
	const userid = req.params.userid;
	db.findUserComments(userid)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({message: 'There are no comments for that user id.'});
            }
        })
        .catch(error => {
            console.log('get comments by user_id error', error);
            res.status(500).json({message: 'There was an error getting comments by user_id.'});
        });
});



module.exports = router;
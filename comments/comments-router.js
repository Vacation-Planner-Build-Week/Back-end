const router = require('express').Router();
const db = require('./comments-model');

router.get('/', (req, res) => {
    db.find()
        .then(comments => {
            if (comments) {
                res.status(200).json({comments});
            } else {
                res.status(404).json({message: 'There are no comments in the  database.'});
            }
        })
        .catch(error => {
            console.log('get all comments error', error);
            res.status(500).json({message: 'There was an error getting comments.'});
        });
});

router.get('/:id', (req, res) => {
    const comment_id = req.params.id;
    db.findById(comment_id)
        .then(comment => {
            if (comment) {
                res.status(200).json({comment});
            } else {
                res.status(404).json({message: 'There is no comment in the database with that id.'});
            }
        })
        .catch(error => {
            console.log('get comment by id error', error);
            res.status(500).json({message: 'There was an error getting comment by id.'});
        });
});

module.exports = router;
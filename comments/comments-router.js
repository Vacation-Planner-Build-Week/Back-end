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

router.post('/', (req, res) => {
    const newComment = req.body;
    db.add(newComment)
        .then(comment => {
            if (comment) {
                res.status(201).json(comment);
            } else {
                res.status(500).json({message: 'Could not add that comment'});
            }
        })
        .catch(error => {
            console.log('add a new comment error', error);
            res.status(500).json({message: 'There was an error adding a comment.'});
        });
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	db.remove(id)
        .then(count => {
            if (count) {
            	res.status(200).json({message: 'The comment was successfully removed.'})
            } else {
            	res.status(500).json({message: 'The comment could not be removed because it did not exist in the database.'})
            }
        })
        .catch(error => {
            console.log('delete comment error', error);
            res.status(500).json({message: 'There was an error removing a comment.'})
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
	const updatedComment = req.body;
	db.update(id, updatedComment)
        .then(comment => {
            if (comment) {
            	res.status(201).json(comment)
            } else {
            	res.status(500).json({message: 'Could not update that comment'})
            }
        })
        .catch(error => {
            console.log('update comment error', error);
            res.status(500).json({message: 'There was an error updating comment by id.'});
        });
});

module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets');

const db = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    user.user_password = bcrypt.hashSync(user.user_password, 10);
    db.add(user)
        .then(addedUser => {
            const token = signToken(addedUser)
            res.status(201).json({
                greeting: `Welcome ${addedUser.user_name}!`,
                user_id: addedUser.user_id,
                user_name: addedUser.user_name,
                token: token
            });
        })
        .catch(error => {
            console.log('add a user error', error);
            if (error.constraint.includes('unique')) {
            	res.status(500).json({message:'That user name already exists.', detail: error.detail})
            } else {
            	res.status(500).json({
                message: 'there was an error adding a user.',
                error: error
            });
            }

        });
});

router.post('/login', (req, res) => {
    let {user_name, user_password} = req.body;
    db.findBy({user_name})
        .then(user => {
            if (user && bcrypt.compareSync(user_password, user.user_password)) {
                const token = signToken(user);
                res.status(200).json({
                    message: `Welcome ${user.user_name}!`,
                    token
                });
            } else {
                console.log('else user', user);
                res.status(500).json({message: 'Invalid Credentials'});
            }
        })
        .catch(error => {
            console.log('login error', error);
            res.status(500).json({message: 'login error'});
        });
});

function signToken(user) {
    const payload = {
        user
    };
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;

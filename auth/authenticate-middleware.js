require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'The token provided is incorrect.'});
            } else {
                req.user = decodedToken.user;
                next();
            }
        });
    } else {
        res.status(401).json({message: 'You must provide a token.'});
    }
};
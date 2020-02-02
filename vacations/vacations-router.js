const router = require('express').Router();
const db = require('./vacations-model');

router.get('/', (req, res) => {
	res.status(200).json({api: 'api running'});
});

module.exports = router;
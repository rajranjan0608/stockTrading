const express = require('express');
var router = express.Router();

var Users  = require('../../models/users.js');

router.get('/getDemo', (req, res) => {
	res.status(200).send({key: "value"});
});

module.exports = router;
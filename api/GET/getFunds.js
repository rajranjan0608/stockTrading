const express = require('express');
var router = express.Router();

const getFunds = require('../../controllers/read/getFunds');

router.get('/getFunds', (req, res) => {
    const username = req.query.username;
    if(username) {
        getFunds(username, (err, funds) => {
            if(err) {
                res.status(500).send({error: "Error. Please try again!"})
            } else {
                res.status(200).send(funds);
            }
        });
    } else {
        res.status(500).send({error: "User not defined!"})
    }
});

module.exports = router;
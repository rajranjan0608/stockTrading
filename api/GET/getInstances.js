const express = require('express');
var router = express.Router();

const getInstances = require('../../controllers/read/getInstances');

router.get('/getInstances', (req, res) => {
    const username = req.query.username;
    if(username) {
        getInstances(username, (err, instances) => {
            if(err) {
                res.status(500).send({error: "Error. Please try again!"})
            } else {
                res.status(200).send(instances);
            }
        });
    } else {
        res.status(500).send({error: "User not defined!"})
    }
});

module.exports = router;
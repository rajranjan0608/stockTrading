const express = require('express');
var router = express.Router();

const getInstanceDetails = require('../../controllers/read/getInstanceDetails.js');

router.get('/getInstanceDetails', (req, res) => {
    const username = req.query.username;
    const instanceId = req.query.instanceId;
    if(username && instanceId) {
        getInstanceDetails(username, instanceId, (err, instance) => {
            if(err) {
                res.status(500).send({error: "Error. Please try again!"})
            } else {
                res.status(200).send(instance);
            }
        });
    } else {
        res.status(500).send({error: "User not defined!"})
    }
});

module.exports = router;
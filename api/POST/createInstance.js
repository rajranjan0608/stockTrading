const express = require('express');
var router = express.Router();

const createInstance = require('../../controllers/write/createInstance');

function checkInstanceDetails(instance) {
    if(!isNaN(instance.investment) && !isNaN(instance.leverage) && !isNaN(instance.daySell) && typeof(instance.mode) == "string" && typeof(instance.fundingMode) == "string") {
        if(parseInt(instance.investment) > 0 && parseInt(instance.leverage) >= 0 && parseInt(instance.leverage) <= parseInt(process.env.MAX_LEVERAGE) && parseInt(instance.daySell) > 0 && (instance.fundingMode == "DUMMY" || instance.fundingMode == "REAL")) {
            const dP = !isNaN(instance.dayProfit), g = !isNaN(instance.goal), t = !isNaN(instance.time);
            if(instance.mode == "TGOAL") {
                if(dP && t) {
                    return true;
                }
            } else if(instance.mode == "TPROFIT") {
                if(g && t) {
                    return true;
                }
            } else if(instance.mode == "TTIME") {
                if(dP && g) {
                    return true;
                }
            }
        }
    }
    return false;
}

router.post('/createInstance', (req, res) => {
    const username = req.body.username;
    if(username) {
        if(checkInstanceDetails(req.body.instance)) {
            createInstance(username, req.body.instance, (err, instance) => {
                if(err) {
                    res.status(500).send({error: "Error. " + err})
                } else {
                    res.status(200).send(instance);
                }
            });
        } else {
            res.status(400).send({error: "Invalid instance detail."})
        }
        
    } else {
        res.status(500).send({error: "User not defined!"})
    }
});

module.exports = router;
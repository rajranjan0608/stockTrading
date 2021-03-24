require('../../configuration/dependencies');

var router = express.Router();

const isLoggedIn = require('../../controllers/middlewares/isLoggedIn');

router.get('/instance', isLoggedIn, async (req, res) => {
    const username = req.user.username;
    const instanceId = req.query.instanceId;
    await local({
        method: "get",
        url: `/api/getInstanceDetails?username=${username}&instanceId=${instanceId}`
    }).then(async (responseData) => {
        instance = responseData.data;
        res.render('./instance.ejs', {instance, user: req.user, symbol: "TATASTEEL"});
    });

});

module.exports = router;
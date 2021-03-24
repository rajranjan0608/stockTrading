require('../../configuration/dependencies');

var router = express.Router();

const isLoggedIn = require('../../controllers/middlewares/isLoggedIn');

router.get('/funds', isLoggedIn, async (req, res) => {
    const username = req.user.username;
    await local({
        method: "get",
        url: `/api/getFunds?username=${username}`
    }).then(async (responseData) => {
        funds = responseData.data;
        res.render('./funds.ejs', {funds});
    });

});

module.exports = router;
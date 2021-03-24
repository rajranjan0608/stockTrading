require('../../configuration/dependencies');

var router = express.Router();

const isLoggedIn = require('../../controllers/middlewares/isLoggedIn');

router.get('/dashboard', isLoggedIn, (req, res) => {
    Users.findOne({username : req.user.username}, async (err, user) => {
        if(err) {
            res.render('./pageNotFound.ejs', {error: "Error fetching user information."});
        } else {
            if(user) {
                const username = req.user.username;
                await local({
                    method: "get",
                    url: `/api/getInstances?username=${username}`
                }).then(async (responseData) => {
                    instances = responseData.data;
                    res.render('./dashboard.ejs', {user, instances, symbol:req.query.symbol});
                });
            } else {
                res.render('./pageNotFound.ejs', {error: "User found in the database."});
            }
        }
    });
});

module.exports = router;
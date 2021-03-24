require('../../configuration/dependencies');

var router = express.Router();

const isLoggedIn = require('../../controllers/middlewares/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
	res.redirect("/dashboard");
});

module.exports = router;
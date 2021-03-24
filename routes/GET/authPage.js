require('../../configuration/dependencies');

var router = express.Router();

router.get('/auth', (req, res) => {
	res.render('./authPage.ejs');
});

module.exports = router;
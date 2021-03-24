require('../configuration/dependencies');

var router = express.Router();

//GET Routes
router.use(require('./GET/default.js'));
router.use(require('./GET/authPage'));
router.use(require('./GET/dashboard'));
router.use(require('./GET/getFunds'));
router.use(require('./GET/getInstanceDetails'));

//POST Routes
// router.use(require('./POST'));

module.exports = router;

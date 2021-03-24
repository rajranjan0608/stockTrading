var express = require('express');

var router = express.Router();

//GET APIs
router.use(require('./GET/getDemo.js'));
router.use(require('./GET/getFunds.js'));
router.use(require('./GET/getInstances.js'));
router.use(require('./GET/getInstanceDetails.js'));

//POST APIs
// router.use(require('./POST/postDemo.js'));
router.use(require('./POST/createInstance'));

//Authentication APIs
router.use(require('./Authentication/signup'));
router.use(require('./Authentication/signin'));

module.exports = router;
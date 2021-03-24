require('../../configuration/dependencies');
require('../../configuration/init')

let checkToken = (req, res, next) => {
    console.log(req.cookies);
    next();
}

module.exports = checkToken;
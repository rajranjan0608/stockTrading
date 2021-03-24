require('../../configuration/dependencies');

module.exports = function getFunds(username, cb){
    Funds.findOne({username}, (err, funds) => {
        return cb(err, funds);
    })
};
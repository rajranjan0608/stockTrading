require('../../configuration/dependencies');

module.exports = function getInstances(username, cb){
    Instances.findOne({username}, (err, instances) => {
        if(instances) {
            return cb(null, instances.instances);
        } else {
            cb("User not found!", null)
        }
    })
};
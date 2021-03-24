require('../../configuration/dependencies');

module.exports = function getInstanceDetails(username, instanceId, cb){
    Instances.findOne({username}, (err, instances) => {
        if(instances) {
            var requiredInstance = null;
            instances.instances.forEach((instance) => {
                if(instance._id == instanceId) {
                    requiredInstance = instance;
                }
            });
            if(requiredInstance) {
                return cb(null, requiredInstance);
            }
            return cb("Instance not found!", null);
        } else {
            cb("User not found!", null)
        }
    })
};
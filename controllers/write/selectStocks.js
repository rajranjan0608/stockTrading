const instance = require('../../models/instances');

require('../../configuration/dependencies');
const stringToInt = require('../middlewares/convertStringToInt');

module.exports = function getFunds(username, instance, cb){
    Users.findOne({username}, (err, user) => {
        if(err) {
            return cb(err, null);
        } else {
            if(user) {
                instance = stringToInt(instance);
                if((instance.fundingMode == "DUMMY" && instance.investment <= user.dummyFund) || (instance.fundingMode == "REAL" && instance.investment <= user.realFund)) {
                    var time = instance.time, goal = instance.goal, dayProfit = instance.dayProfit;
                    if(instance.mode == "TGOAL") {
                        goal = getInstanceParameters(instance);
                        if(goal == -1) {
                            return cb("Invalid parameters", null);
                        }
                    } else if(instance.mode == "TTIME") {
                        time = getInstanceParameters(instance);
                        if(time == -1) {
                            return cb("Invalid parameters", null);
                        }
                    } else {
                        dayProfit = getInstanceParameters(instance);
                        if(dayProfit == -1) {
                            return cb("Invalid parameters", null);
                        } 
                    }
                    Instances.findOne({username}, (err, instances) => {
                        if(err) {
                            cb("Error occured!", null);
                        } else {
                            if(instances) {
                                instances.instances.push({
                                    fundingMode : instance.fundingMode,
                                    investment  : instance.investment,
                                    leverage    : instance.leverage,
                                    daySell     : instance.daySell,
                                    mode        : instance.mode,
                                    time,
                                    goal,
                                    dayProfit
                                });
                                instances.save((err, newInstance) => {
                                    if(err) {
                                        return cb("Server side error while creating instance", null);
                                    } else {
                                        return cb(null, newInstance);
                                    }
                                });
                            } else {
                                cb("No user found!", null);
                            }
                        }
                    });
                } else {
                    return cb("Insufficient funds", null);
                }
            } else {
                return cb("User Not Found", null);
            }
        }
    });
};
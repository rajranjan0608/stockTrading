const instance = require('../../models/instances');

require('../../configuration/dependencies');
const stringToInt = require('../middlewares/convertStringToInt');

function calcBrokerage(m, I) {
    b = Math.min(0.0005 * (m + 1) * I, 20)
    return b
}

function calcGoal(I, m, S, b, k, t) {
    const netProfit = ((m+1) * k / 5) - (b/I) - ((m+1) * S / 100);
    if(netProfit < 0) {
        return -1;
    }
    G = I * Math.pow((1 + netProfit), t)
    return parseInt(G)
}

function calcKValue(I, m, S, b, G, t) {
    if((G/I) < 0) {
        return -1;
    }
    k = 5 * (((Math.pow((G/I), 1/t) - 1)/(m+1)) + S/100 + ((b/I)*(m+1)))
    return round(k, 2)
}

function calcTime(I, m, S, b, k, G) {
    const netProfit = ((m+1) * k / 5) - (b/I) - ((m+1) * S / 100);
    if(netProfit < 0 || (G/I) < 0) {
        return -1;
    }
    t = Math.log((G/I)) / Math.log(1 + netProfit)
    return Math.ceil(t);
}

function calcReservePercentage(M, m) {
    R = (M - m) / (M + 1)
    return R * 100
}

function calcBrokerage(I, m, S) {
    var maxStock = parseInt(process.env.MAX_SELECTED_STOCKS);
    var b = Math.min(0.0005 * (m + 1) * I / maxStock, 20);
    b = b * S * 2 * maxStock;
    b = b * 20;
    return b;
}

function getInstanceParameters(instance) {
    var I = instance.investment,
        m = instance.leverage,
        S = instance.daySell,
        b = calcBrokerage(I, m, S),
        G, t, k;
    if(instance.mode == "TGOAL") {
        t = instance.time;
        k = instance.dayProfit;
        return calcGoal(I, m, S, b, k, t);
    } else if(instance.mode == "TTIME") {
        G = instance.goal;
        k = instance.dayProfit;
        return calcTime(I, m, S, b, k, G);
    } else {
        G = instance.goal;
        t = instance.time;
        return calcKValue(I, m, S, b, G, t);
    }
}

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
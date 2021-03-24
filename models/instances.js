var mongoose = require('mongoose');

//TABLE SCHEMA
var instanceSchema = new mongoose.Schema({
    username    : String,
    instances   : [{
        fundingMode : String,
        investment  : Number,
        leverage    : Number,
        daySell     : Number,
        dayProfit   : Number,
        time        : Number,
        goal        : Number,
        mode        : String
    }]
});

//MAKING TABLE
var instance = new mongoose.model("instance", instanceSchema);

//EXPORTING MODEL
module.exports = instance;
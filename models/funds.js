var mongoose = require('mongoose');

//TABLE SCHEMA
var fundSchema = new mongoose.Schema({
    username    : String,
    dummyFund   : Number,
    realFund    : Number
});

//MAKING TABLE
var funds = new mongoose.model("funds", fundSchema);

//EXPORTING MODEL
module.exports = funds;
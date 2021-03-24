var mongoose = require('mongoose');

//TABLE SCHEMA
var selectedStocksSchema = new mongoose.Schema({
    instanceId  : String,
    stocks      : [{
        scripId         : String,
        isActive        : Boolean,
        netQuantity     : Number,
        transactions    : [{
            timestamp   : Number,
            action      : String,
            quantity    : Number,
            price       : Number,
        }]
    }]
});

//MAKING TABLE
var selectedStocks = new mongoose.model("selectedStocks", selectedStocksSchema);

//EXPORTING MODEL
module.exports = selectedStocks;
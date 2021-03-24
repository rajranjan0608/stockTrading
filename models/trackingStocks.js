var mongoose = require('mongoose');

//TABLE SCHEMA
var trackingStockSchema = new mongoose.Schema({
    scripId     : String,
    stockData   : [{
        timestamp   : Number,
        open        : Number,
        high        : Number,
        low         : Number,
        close       : Number
    }]
});

//MAKING TABLE
var trackingStocks = new mongoose.model("trackingStocks", trackingStockSchema);

//EXPORTING MODEL
module.exports = trackingStocks;
var mongoose                = require("mongoose");

//TABLE SCHEMA
var transactionSchema = new mongoose.Schema({
    username        : String,
    transactionDetails  : [{
        fundType        : String,
        isCredit        : Boolean,
        transactionType : String,
        orderId         : String,
        metaDetails     : Object,
        success         : Boolean,
        gatewayResponse : Object
    }]
});

//MAKING TABLE
var transactions = new mongoose.model("transactions", transactionSchema);

//EXPORTING MODEL
module.exports = transactions;
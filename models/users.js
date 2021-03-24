var mongoose                =require("mongoose");
var passportLocalMongoose   =require("passport-local-mongoose");

//TABLE SCHEMA
var userSchema = new mongoose.Schema({
    username            : String,
    email               : String,
    fullName            : String,
    phone               : Number,

    realFund            : Number,
    dummyFund           : Number,

    authType            : String,
    profilePicture      : String,
    accessToken         : String,
    refreshToken        : String,

    userType            : String,

    password            : String,
    resetPasswordToken  : String,
    resetPasswordExpires: Date,
    
    isConfirmedToken    : String,
    isConfirmed         : Boolean
});

userSchema.plugin(passportLocalMongoose);

//MAKING TABLE
var users = new mongoose.model("users", userSchema);

//EXPORTING MODULE
module.exports = users;
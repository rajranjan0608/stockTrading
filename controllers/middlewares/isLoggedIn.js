//IS LOGGED IN MIDDLEWARE
module.exports = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.render("./authPage.ejs");
};
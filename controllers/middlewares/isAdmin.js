module.exports = function isAdmin(req,res,next) {
    if(req.user != undefined) {
        if(req.user.userType=="admin") {
            return next();
        }else{
            res.render("pageNotFound.ejs", {error: 'Unauthenticated! Sorry this page is forbidden.'});
        }
    } else {
        res.redirect("/pageNotFound");
    }
};
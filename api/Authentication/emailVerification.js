require('../../configuration/dependencies');

router = express.Router();

router.get("/emailVerification",function(req,res){
    User.findOne({username:req.query.username},function(err,user){
        if(user){
            if(user.isConfirmedToken==req.query.isConfirmedToken){
                user.isConfirmed=true;
                user.save();
                req.flash("success","E Mail verified successfully! Thank you for your time.");
                res.redirect("/emailVerificationResult");
            }else{
                req.flash("error","E Mail cannot be verified, Please contact at admin@gamingtour.ga");
                res.redirect("/emailVerificationResult");
            }
        }else{
            req.flash("error","User doesn't Exist");
            res.redirect("/emailVerificationResult")
        }
    });
});

router.get("/emailVerificationResult",function(req,res){
    res.render("emailVerification.ejs");
})

module.exports = router;

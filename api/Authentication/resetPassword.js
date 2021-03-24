require('../../configuration/dependencies');

router.get("/resetPassword",function(req,res){
    res.render("resetPassword.ejs");
});

router.post("/resetPassword",function(req,res){
    var email=req.body.email;

    User.findOne({email:email},function(err,user){
        if(!user){
            req.flash("error","No account with that email exists!");
            res.redirect("/resetPassword");
        }else{
            if(user.authType == 'gamingTour') {
                var resetToken = randomString.generate({
                    length: 24,
                    charset: "alphanumeric"
                });
    
                user.resetPasswordToken=resetToken;
                user.resetPasswordExpires=Date.now()+360000;
    
                user.save();
    
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                
                var msg={
                    to          : email,
                    from        : {
                
                                    email: "noreply@gamingtour.com",
                                    name : "Gaming Tour"
                                  },
                    subject     :   "Password Reset Link",
                    html        :   "<h4>Hi, "+user.fullName+"</h4><br>We have received a request from you for the reset of your password.<br><br><strong>Please click on the link given below to set your new password.</strong><br><br>"+
                                    "<a href='"+process.env.DOMAINADDRESS+"/newPassword?username="+user.username+"&resetToken="+resetToken+"'>Click this link to Reset Password</a><br>"+"<h4>This link would be expired within 1 hour. If this request has not been initiated by you then ignore this mail, your password would remain untouched. Do not share this link with anyone!"
                                    
                };
                sgMail.send(msg);
    
                req.flash("userCreated","Mail with reset link (valid for next 1 hour) has been sent to "+req.body.email);
                res.redirect("/resetPassword");
            } else {
                res.render('./pageNotFound.ejs', {error: "You haven't signed in with Gaming Tour! You may have used Social Logins"})
            }
        }
    });
});

router.get("/newPassword",function(req,res){
    var username=req.query.username;
    var resetPasswordToken=req.query.resetToken;
    res.render("newPassword.ejs",{username:username,resetPasswordToken:resetPasswordToken});
});

router.post("/newPassword",function(req,res){

    async.waterfall([
        function(done) {

            User.findOne({username:req.body.username, resetPasswordToken:req.body.token, resetPasswordExpires: {$gt: Date.now()}},function(err,user){
                if(!user){
                    req.flash("error","Invalid token or link expired!");
                    res.redirect("/newPassword?username="+req.body.username+"&resetPasswordToken="+req.body.token);
                }else{
                    if(req.body.password==req.body.cpassword){
                        
                        user.setPassword(req.body.password, function(err){
                            user.resetPasswordToken=undefined;
                            user.resetPasswordExpires=undefined;
                            user.save();

                            req.flash("userCreated","Password updated successfully! Sign in to verify new password.")
                            res.redirect("/");
                        });

                    }else{
                        req.flash("error","Passwords do not match. Try again!");
                        res.redirect("/newPassword?username="+req.body.username+"&resetPasswordToken="+req.body.token);
                    }
                }
            });
        }
    ])
});

module.exports = router;

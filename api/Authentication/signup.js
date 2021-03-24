require("../../configuration/dependencies");

var router      = express.Router();

function usernameIsValid(username) {
    return /^[0-9a-zA-Z_.-]+$/.test(username);
}

function emailIsValid(email) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i .test(email)
}

router.post("/signup", function(req,res){
    var username    = req.body.username;
    var password    = req.body.password;
    var email       = req.body.email;
    var fullName    = req.body.fullName;

    Users.findOne({username: username}, (err, user) => {
        if(err) {
            res.status(500).send({message: 'Error processing request!'});
        } else {
            if(user != null && user != undefined && user != '' && user.length != 0 && user.username == username) {
                res.render('./pageNotFound.ejs', {error: 'Username not available!'});
            } else {
                Users.findOne({email: email}, (err2, user2) => {
                    if(user2 != null && user2 != undefined && user2 != '' && user2.length != 0) {
                        res.render('./pageNotFound.ejs', {error: 'Email already taken!'})
                    } else {
                        if(usernameIsValid(username)) {
                            if(emailIsValid(email)) {
                                const isConfirmedToken = randomString.generate({
                                    length: 24,
                                    charset: "alphanumeric"
                                });
                            
                                var newUser = new Users({
                                                        username            : username, 
                                                        email               : email, 
                                                        isConfirmedToken    : isConfirmedToken, 
                                                        fullName            : fullName, 
                                                        isConfirmed         : false,
                                                        dummyFund           : 5000,
                                                        realFund            : 0,
                                                        userType            : 'general',
                                                        authType            : 'SIM'
                                                    })
                            
                                Users.register(newUser,password,function(err,user){
                                    if(err){
                                        req.flash("userNotCreated","An error has been occurred! Please try again in a bit.")
                                        res.render('./pageNotFound.ejs', {error: 'Please try again!'})
                                        return next();
                                    }
                                    passport.authenticate("local")(req,res,function(){
                                        req.flash("userCreated","User created successfully! Please verify your email before joining or organising Tournaments")
                                        res.redirect("/");
                                    });
                            
                                    Transactions.create({
                                        username : username,
                                        transactionDetails : [{
                                            fundType        : "DUMMY",
                                            isCredit        : true,
                                            transactionType : "SIM",
                                            orderId         : Date.now(),
                                        }]
                                    });

                                    Instances.create({
                                        username,
                                        instances : []
                                    });
                                });
                            } else {
                                res.render('./pageNotFound.ejs', {error: 'Invalid email!'})
                            }
                        } else {
                            res.render('./pageNotFound.ejs', {error: 'Invalid username!'})
                        }
                    }
                });
            }
        }
    });
});

module.exports = router;

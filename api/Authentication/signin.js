require('../../configuration/dependencies');
require('../../configuration/init');

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.send({"Error": "User not found"}); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.redirect('/');
        });
    })(req, res, next);
})

router.get("/logout",function(req,res){    
    req.logout();
    res.redirect(req.query.url);
});

module.exports = router;
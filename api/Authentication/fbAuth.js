require("../../configuration/dependencies");

var router      = express.Router();

const fbConfig = {
    clientID		: process.env.FBID,
    clientSecret	: process.env.FBKEY,
    callbackURL		: "https://www.stocktrading.co/api/auth/facebook/callback",
    profileFields	: ["id", "displayName", "name", "photos", "email"]
}

//FACEBOOK API
passport.use(new FacebookStrategy(fbConfig, (accessToken, refreshToken, profile, done) => {
	console.log(profile);
    var email 				= profile.emails[0].value;
	var tempUsername  		= Date.now();

    User.findOne({email: profile.emails[0].value}, function(err, user) {
		if(user) {
			console.log('User in the database. Sign In');
			return done(null, user);
		} else {
			var newUser = new User();
			newUser.username 		= tempUsername;
			newUser.email    		= email;
			newUser.fullName		= profile.displayName;
			newUser.userType 		= "general";
			newUser.accessToken		= accessToken;
			newUser.authType		= 'facebook';
			newUser.isConfirmed		= "true";
			newUser.profilePicture	= profile.photos[0].value;

			newUser.save(function(err) {
				if(err) {
					return done(null, false); 
				} else {
					fs.readFile("./public/emails/welcome.html", function(err, buf) {

					    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

					    var msg={
					        to          : email,
					        from        : {

					                        email: "welcome@gamingtour.co",
					                        name : "Gaming Tour"
					                      },
					        subject     :   "Welcome to Gaming Tour",
					        html        :   buf.toString()
					    };

					    sgMail.send(msg);

					}); 

					Transactions.create({
						username : tempUsername
					});

					UserActivity.create({
						username : tempUsername,
						activity : [{date: new Date(), message: "User created successfully!", code: "NUSR", username: tempUsername}]
					});
					console.log('New user created');
					return done(null, newUser);
				}
			});
		}
	});
	
}));

//FACEBOOK OAUTH
router.get('/auth/facebook', passport.authenticate('facebook', { scope: "email" }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

module.exports = router;
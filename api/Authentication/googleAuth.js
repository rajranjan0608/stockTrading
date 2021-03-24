require("../../configuration/dependencies");

var router      = express.Router();

var googleConfigData = {};
if(process.env.STAGE == 'DEVELOPMENT') {
	googleConfigData = {
		clientID		: process.env.GOOGLEID,
		clientSecret	: process.env.GOOGLEKEY,
		callbackURL		: "http://me.mydomain.com:3000/api/auth/google/callback"
	}
} else if(process.env.STAGE == 'PRODUCTION') {
	googleConfigData = {
		clientID		: process.env.GOOGLEID,
		clientSecret	: process.env.GOOGLEKEY,
		callbackURL		: process.env.DOMAINADDRESS+"/api/auth/google/callback"
	}
}

passport.use(new GoogleStrategy(googleConfigData, (accessToken, refreshToken, profile, done) => {
	const email 		= profile.emails[0].value;
	const tempUsername  = Date.now();
	
	User.findOne({email: profile.emails[0].value}, function(err, user) {
		if(user) {
			console.log('User in the database! Sign In')
			return done(null, user);
		} else {
			var newUser = new User();
			newUser.username 		= tempUsername;
			newUser.email    		= email;
			newUser.fullName		= profile.displayName;
			newUser.userType 		= "general";
			newUser.accessToken		= accessToken;
			newUser.authType		= 'google';
			newUser.isConfirmed		= profile.emails[0].verified;
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

					console.log('New user created!')

					return done(null, newUser);
				}
			});
		}
	});
}));

router.get("/auth/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/plus.login", "profile", "email"]}));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

module.exports = router;
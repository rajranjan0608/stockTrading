require('./dependencies');

//CREATING EXPRESS-SESSION
app.use(require("express-session")({
	secret: "Hi there",
	resave: false,
	saveUninitialized: false
}));

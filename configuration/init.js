require('./dependencies');

app.use(cors());
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.url=req.url;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	res.locals.login=req.flash("login");
	res.locals.logout=req.flash("logout");
	res.locals.userCreated=req.flash("userCreated");
	res.locals.userNotCreated=req.flash("userNotCreated");
	next();
});

app.use(express.static("public"));

if(process.env.STAGE == 'PRODUCTION') {
	app.use(secure);
}

if(process.env.STAGE == 'DEVELOPMENT') {
	mongoURI="mongodb://" + "127.0.0.1" + "/stockTrading";
} else if(process.env.STAGE == 'PRODUCTION') {
	mongoURI = process.env.MONGOURI;
}

adminKey = new Cryptr(process.env.ADMINKEY)

mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.set("view engine", "ejs");

if(process.env.STAGE == 'DEVELOPMENT') {
	local = axios.create({baseURL: 'http://' + process.env.IPADDRESS + ':' + process.env.PORT});
} else if(process.env.STAGE == 'PRODUCTION') {
	local = axios.create({baseURL: process.env.APIDOMAIN});
}
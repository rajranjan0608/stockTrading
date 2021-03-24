require('./configuration/dependencies');
require('./configuration/session');
require('./configuration/passport');
require('./configuration/init');

require("dotenv").config();

const PORT = process.env.PORT || 3000;

var API = require('./api/API.js');
app.use('/api/', API);

var ROUTES = require('./routes/ROUTES.js');
app.use('/', ROUTES);

app.use(express.static("public"));

var server = app.listen(PORT || process.env.PORT, () => {
	console.log("Running on " + PORT);
});

//SOCKET PROGRAMMING ALONG WITH MONGODB DATABASE

//IMPORTING SOCKET
var socket = require("socket.io");

//SOCKET SETUP : ON THE SERVER SIDE
var io = socket(server);

app.post('/chat', (req, res) => {
	const chatId = "chat"+req.body.tourId;
	var data = {
		isCurrentUser 	: false,
		isInvalid		: true,
		username 		: '',
		fullName		: '',
		message 		: '',
	};
	if(req.user) {
		if(req.body.message) {
			data.isCurrentUser = true;
			data.isInvalid = false;
			data.username = req.user.username;
			data.fullName = req.user.fullName;
			data.message = req.body.message;

			io.sockets.emit(chatId, data);

			Messages.findOne({tourId: req.body.tourId}, (err2, message) => {
				message.messages.push({
					username	: data.username,
					message		: data.message,
					fullName	: req.user.fullName
				});
				message.save();
			});

			res.send({bool: true, message: 'Data emitted!'});
		}
	} else {
		res.send({bool: false, message: 'Login first!'})
	}
});

//LISTENING FROM THE CLIENTS
io.on("connection", function(socket) {
	var axios = require("axios").default;

	socket.on("tickerSearch", function(data) {
		var options = {
			method: 'GET',
			url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
			params: {q: data.tickerName, region: 'IN'},
			headers: {
				'x-rapidapi-key': process.env.RAPID_API_YAHOO,
				'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
			}
		};

		axios.request(options).then(function (response) {
			io.sockets.emit("tickerSearch", response.data.quotes);
		}).catch(function (error) {
			console.error(error);
		});
	});
});

//PAGE NOT FOUND ROUTE TO BE AT THE BOTTOM MOST OF ALL ROUTES
app.get("*",function(req, res){
	res.status(404).render("pageNotFound.ejs", {error:req.query.error});
});
express             = require("express");
bodyParser          = require("body-parser");
cors                = require("cors");
ejs                 = require("ejs");
mongoose            = require("mongoose");
flash               = require("connect-flash");
axios               = require("axios");
async               = require("async");

randomString        = require("randomstring");
Cryptr              = require("cryptr");
cookieParser        = require("cookie-parser");
secure              = require('express-force-https');

sgMail              = require("@sendgrid/mail");
fs                  = require("fs");

passport            = require("passport");
localStrategy       = require("passport-local");

GoogleStrategy	= require("passport-google-oauth").OAuth2Strategy;
TwitterStrategy = require('passport-twitter').Strategy;
FacebookStrategy= require('passport-facebook').Strategy;

Users               = require("../models/users");
Transactions        = require("../models/transactions");
Instances           = require("../models/instances");
Funds               = require("../models/funds");

app = express();					
router = express.Router();
require('dotenv').config();

module.exports = {}

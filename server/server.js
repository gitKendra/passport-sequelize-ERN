const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
var db = require("./models");
var env = process.env.NODE_ENV || "development";
const passport = require('./passport');
const app = express()
const PORT = process.env.PORT || 3001;

// Route requires
const user = require('./routes/user')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
var options = require(__dirname + "\\config.json")[env];
var sessionStore = new MySQLStore(options, db.sequelize);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

// Starting Server and database connection
db.sequelize.sync({force: false}).then(function() {
  console.log("sequelize linked!");
	app.listen(PORT, () => {
		console.log(`App listening on PORT: ${PORT}`)
	})
});

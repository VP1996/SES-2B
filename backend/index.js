const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Recaptcha = require('recaptcha-verify');

const connectDB = require('./config/db');

//routes
const users = require('./routes/api/user');

const app = express();

//connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// enable CORS without external module
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	next();
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Backend'));

//use Routes
app.use('/api', users);

//recaptcha
const recaptcha = new Recaptcha({
	secret: '6Lcz5bUaAAAAALuodhTSq-KbPS2VSTmPxg8Y-dFJ',
	verbose: true,
});

app.post('/recaptcha', function (req, res) {
	// get the user response (from reCAPTCHA)
	let userResponse = req.body.value;
	console.log(req.body.value);

	recaptcha.checkResponse(userResponse, function (error, response) {
		if (error) {
			console.log('issues');
			// an internal error?
			res.status(400).render('400', {
				message: error.toString(),
			});
			return;
		}
		if (response.success) {
			res.status(200).send('the user is a HUMAN :)');
			// save session.. create user.. save form data.. render page, return json.. etc.
		} else {
			res.status(200).send('the user is a ROBOT :(');
			console.log(response.data);
			// show warning, render page, return a json, etc.
		}
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starting on port ${PORT}`));

module.exports = app;

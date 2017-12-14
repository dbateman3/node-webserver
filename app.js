const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


let app = express();

//register partials to use for templates
hbs.registerPartials(__dirname + '/views/partials');
//set express configuration key value pair
//view dir is default to render express views
app.set('view engine', 'hbs');

//app use registers middleware and takes a function
// next tells express when your middleware function is done
app.use(function(req, res, next) {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});
/* maintenance middleware
app.use(function(req, res, next) {
	res.render('maintenance.hbs');
});
*/
//the order you use middleware is important
//middleware, use __dirname to point to this apps location then file
//for static webpages, help.html
app.use(express.static(__dirname + '/public'));

//helper function
hbs.registerHelper('getCurrentYear', function() {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
	return text.toUpperCase();
});


//routing
app.get('/', function(req, res) {
	//res.send('<h1>hello Express</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome!'

	});
});

app.get('/about', function(req, res) {
	//render any templates with the current view engine
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', function(req, res) {
	res.send({
		errorMessage: 'Bad Request'
	});
});



app.listen(3000, function() {
	console.log('Server is up on port 3000');
});
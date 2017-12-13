const express = require('express');


let app = express();

app.get('/', function(req, res) {
	//res.send('<h1>hello Express</h1>');
	res.send({
		name: 'Dan',
		age: 25,
		likes: ['programming', 'kids']
	})
});

app.get('/about', function(req, res) {
	res.send('About Page');
});

app.get('/bad', function(req, res) {
	res.send({
		errorMessage: 'Bad Request'
	});
});

app.listen(3000);
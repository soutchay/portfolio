var express = require('express'),
	app     = express(),
	http    = require('http');

var port        = process.env.PORT || 3000;
console.log('running');
app.listen(port);

var router = express.Router();
console.log(__dirname);
router.route('/')
	.get(function(req, res){
		res.sendFile(__dirname + '/index.html');
	});

app.use(router);
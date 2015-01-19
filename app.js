var express = require('express'),
	app     = express(),
	http    = require('http'),
	public_path = require('path');

var port        = process.env.PORT || 3000;
console.log('running on port:', port);

app.use(express.static(public_path.join(__dirname, 'public')));

app.listen(port);

var router = express.Router();
console.log(__dirname);
router.route('/')
	.get(function(req, res){
		res.sendFile(__dirname + '/index.html');
	});

app.use(router);
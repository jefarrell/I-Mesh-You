var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server listening at http://%s:%s", host, port);
});

app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.static(path.join(__dirname, '/public/assets')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(favicon('public/assets/favicon.ico'));


var routes = require('./routes/index');
app.get('/', routes.index);
app.get('/test', routes.test);


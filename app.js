var express = require('express');
var path = require('path');

var app = express();
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server listening at http://%s:%s", host, port);
});

app.use(express.static(path.join(__dirname, './dist/')));


app.get('/', function(req, res) {
	res.sendFile("index.html", {"root":"views"});
})

module.exports = app;




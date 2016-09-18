const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

const server = app.listen(3000, function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log("Server listening at http://%s:%s", host, port);
});

const url = 'mongodb://127.0.0.1:27017/MeshYou'
MongoClient.connect(url, (err, db) => {
	assert.equal(null,err);
	console.log("database connected");

	db.close();
});


app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.static(path.join(__dirname, '/public/assets')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(favicon('public/assets/favicon.ico'));


const routes = require('./routes/index');

app.get('/', routes.index);
app.get('/test', routes.test);


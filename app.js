const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
//const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');
const mongoose = require('mongoose');

const app = express();

const url = 'mongodb://127.0.0.1:27017/MeshYou'

// MongoClient.connect(url, (err, db) => {
// 	assert.equal(null,err);
// 	console.log("Database Connected");
// 	const server = app.listen(3000, () => {
// 		const host = server.address().address;
// 		const port = server.address().port;
// 		console.log("Server listening at http://%s:%s", host, port);
// 	});
// });

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
	console.log("Database open")
	const server = app.listen(3000, () => {
		const host = server.address().address;
		const port = server.address().port;
		console.log("Server listening at %s%s", host, port);
	});	

});

app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.static(path.join(__dirname, '/public/assets')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(favicon('public/assets/favicon.ico'));


const routes = require('./routes/index');

app.get('/', routes.index);
app.get('/test', routes.test);


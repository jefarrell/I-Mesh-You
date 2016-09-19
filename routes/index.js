const NodeGeocoder = require('node-geocoder');
const User = require('../models/User.js')

const options = {
	provider: 'google'
};

const geocoder = NodeGeocoder(options);

exports.index = (req, res) => {
	
	res.sendFile('index.html', {'root':'views'});

}

exports.test = (req, res) => {
	const info = {
		'name': 'my application',
		'status': 'OK'
	}
	res.json(info);
}

exports.addData = (req, res) => {

	const usr = new User ({
		KON: req.body.KON,
		name: req.body.name,
		twitter: req.body.twitter,
		primaryLoc: {
			lon: null,
			lat: null			
		},
		secondLoc: {
			lon: null,
			lat: null
		},
		thirdLoc: {
			lon: null,
			lat: null
		}
	});

	console.log("receiving... ", req.body);

	geocoder.batchGeocode([req.body.loc1, req.body.loc2, req.body.loc3], (err,res) => {
		console.log("geocode");
		if (res[0].error === null) { 
			usr.primaryLoc.lon = res[0].value[0].longitude;
			usr.primaryLoc.lat = res[0].value[0].latitude;
		}
		if (res[1].error === null) { 
			usr.secondLoc.lon = res[1].value[0].longitude;
			usr.secondLoc.lat = res[1].value[0].latitude;
		}
		if (res[2].error === null) { 
			usr.thirdLoc.lon = res[2].value[0].longitude;
			usr.thirdLoc.lat = res[2].value[0].latitude;
		}

		usr.save(function(err, data, numAffected) {
			if (err) console.log(err);
			else {
				console.log("NUM : ", numAffected);
				console.log(data);
			};
		});
	});




	res.end();
}






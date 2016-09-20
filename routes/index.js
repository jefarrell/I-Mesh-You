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
		locations: {
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
		},
	});

	geocoder.batchGeocode([req.body.loc1, req.body.loc2, req.body.loc3], (err,res) => {

		if (res[0].error === null) { 
			usr.locations.primaryLoc.lon = res[0].value[0].longitude;
			usr.locations.primaryLoc.lat = res[0].value[0].latitude;
		}
		if (res[1].error === null) { 
			usr.locations.secondLoc.lon = res[1].value[0].longitude;
			usr.locations.secondLoc.lat = res[1].value[0].latitude;
		}
		if (res[2].error === null) { 
			usr.locations.thirdLoc.lon = res[2].value[0].longitude;
			usr.locations.thirdLoc.lat = res[2].value[0].latitude;
		}

		// usr.save(function(err, data, numAffected) {
		// 	if (err) console.log(err);
		// 	else {
		// 		console.log("Working check ------------------------ : ", numAffected);
		// 		//console.log(data);
		// 	};
		// });

		// Check 
		var toUpdate = {};
		toUpdate = Object.assign(toUpdate, usr._doc);
		delete toUpdate._id;

		console.log(toUpdate.KON)
		User.findOneAndUpdate({ KON: toUpdate.KON }, toUpdate, {upsert: true, new: true}, function(err, doc) {
			if (err) { console.log("error!!! - ", err) }
			else {
				console.log("NEW THANG ", doc)
			}
		})
	});
	res.end();
}




exports.mapData = (req, res) => {

	// Placeholder GeoJSON obj
	const geoData = {
	  "type": "FeatureCollection",
	  "features": []
	};


	// Wonky fix because of course
	const checker = ["primaryLoc", "secondLoc", "thirdLoc"];
	const container = [];

	// Query database, get location data
	// Parse it and create GeoJSON object

	User.find(function(err, data) {
		for (key in data) {
			if(data.hasOwnProperty(key)) {
				container.push(data[key]['locations'])
			}
		}
		console.log(container)
		
		for(var i=0;i<container.length;i++){
			var temp = container[i];
			for (var x = 0; x < checker.length; x++){
				var name = temp[checker[x]]["name"];
				var lat = temp[checker[x]]["lat"];
				var lng = temp[checker[x]]["lon"];

				if (lat === null || lng === null) {} 
				else {
					geoData['features'].push( 
						{
							"type": "Feature",
							"geometry": {"type": "Point", "coordinates": [ lng, lat]},
							"properties": {
							"name": name
							}
						}
					)
				}
			}	

		 }
	console.log(JSON.stringify(geoData));
	res.json(geoData);

	});
}





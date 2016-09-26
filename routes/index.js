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
		name: req.body.name,
		twitter: req.body.twitter,
		site: req.body.site,
		bio: req.body.bio,
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
		if(err) {
			console.log('geocode error - ', err);
			return
		};

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

		usr.save(function(err, doc) {
			if (err) { 
				console.log("User find&update Error! - ", err);
				return;
			}
			else {
				console.log("database updated");
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


exports.inputgeo = (req,res) => {
	geocoder.geocode(req.body.input, function(err,response){
		if (err) {
			console.log(err);
			return;
		}
			else {
				geoResponse = {
					lat: response[0].latitude,
					lon: response[0].longitude
				};
				res.json(geoResponse);
			}
	})
}

exports.klaviyo = (req,res) => {
	const key = 'pk_738493bf8c23b4a3d12ffdfcb63069f6b3';
	const listID = 'cG9t3T';

	const apiRes = {
		key: key,
		id: listID
		}

	res.send((JSON.stringify(apiRes)));
}

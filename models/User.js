const mongoose = require('mongoose');
const Schema = require mongoose.Schema;

/*
	KONs as String?
	Validate KON
		>>>> Probably don't validate here either - do it first on initial post
	Validate Address (maybe not here)
		>>>> Maybe on submit, convert address to lat/lon, store that

*/

const userSchema = new Schema ({
	KON: { type: String, required: true, validate: [KONval, 'Invalid Order Number']},
	name: String,
	primaryLoc: {
		name: String
		lon: { type: Number, required: true },
		lat: { type: Number, required: true}
	},
	secondLoc: {
		name: String,
		lon: Number,
		lat: Number
	},
	thirdLoc: {
		name: String,
		lon: Number,
		lat: Number
	}
	date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
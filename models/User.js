const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Is KON a string?  Number? 

const userSchema = new Schema ({
	KON: { type: String, required: true },
	name: String,
	twitter: String,
	primaryLoc: {
		lon: { type: Number, required: true },
		lat: { type: Number, required: true}
	},
	secondLoc: {
		lon: Number,
		lat: Number
	},
	thirdLoc: {
		lon: Number,
		lat: Number
	},
	date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
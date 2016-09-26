const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
	username: String,
	twitter: String,
	site: String,
	bio: { type: String, maxlength: 140 },
	locations: {
		primaryLoc: {
			name: { type: String, default: "Primary Location"},
			lon: { type: Number, required: true },
			lat: { type: Number, required: true}
		},
		secondLoc: {
			name: { type: String, default: "Potential Location"},
			lon: Number,
			lat: Number
		},
		thirdLoc: {
			name: { type: String, default: "Potential Location"},
			lon: Number,
			lat: Number
		}
	},
	date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
//Profile Model
const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},

	about: {
		type: String,
	},
	followers: [
		{
			_id: mongoose.Schema.Types.ObjectId,
		},
	],
	following: [
		{
			_id: mongoose.Schema.Types.ObjectId,
		},
	],
});

module.exports = mongoose.model('profile', ProfileSchema);

//Profile Model
const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	followers: [
		{
			follower_id: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},
	],
});

module.exports = mongoose.model('profile', ProfileSchema);

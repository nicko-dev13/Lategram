//User Model
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'posts'
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('user', UserSchema);

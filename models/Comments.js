const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	createdat: {
		type: Date,
		default: Date.now()
	},
	comment: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('comment', commentSchema);

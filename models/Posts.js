//Posts Model
const mongoose = require("mongoose");

// require('../models/Comments');
// const param= mongoose.model('comments')

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

const PostSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
    postTitle: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    dateCreated: {
		type: Date,
		default: Date.now
    },
    Comment:[commentSchema]
   
});

module.exports = mongoose.model("post", PostSchema);
//Posts Model
const mongoose = require("mongoose");

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
	} 
});

module.exports = mongoose.model("post", PostSchema);
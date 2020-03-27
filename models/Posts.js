//Posts Model
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    dateCreated: {
		type: Date,
		default: Date.now
	} 
});

module.exports = mongoose.model("posts,", PostSchema);
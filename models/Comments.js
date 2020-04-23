const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
    },
});

module.exports = mongoose.model("comment", commentSchema);

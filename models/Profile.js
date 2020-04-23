//Profile Model
const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },

    about: {
        type: String,
    },
    followers: [
        {
            follower_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        },
    ],
});

module.exports = mongoose.model("profile", ProfileSchema);

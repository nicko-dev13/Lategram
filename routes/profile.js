const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const User = require("../models/User");
const Profile = require("../models/Profile");

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
router.post("/follow/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const profile = await Profile.find();

        console.log(profile);

        if (!user) {
            return res.status(400).json({ msg: "No User found" });
        }

        if (
            profile.followers.filter(
                (follower) => follower.follower_id.toString() === req.user.id
            ).length > 0
        ) {
            return res.status(400).json({ msg: "Already a Follwer" });
        }

        profile.followers.unshift({ follower_id: req.user.id });

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { validationResult, check } = require("express-validator");

const User = require("../models/User");
const Profile = require("../models/Profile");

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
router.post(
    "/",
    [auth, [check("about", "About cannot be Empty").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const profile = new Profile({
                about: about,
            });

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
router.post("/follow/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const profile = new Profile({
            user_id: req.params.id,
        });

        await profile.save();

        console.log(profile.followers);

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

        profile.followers.push(req.user.id);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
router.post('/follow/:id', auth, async (req, res) => {
	// try {
	// 	var getFollower = await User.findOne({ _id: req.params.id });
	// 	const follower = {
	// 		follower_id: getFollower._id,
	// 	};
	// } catch (error) {
	// 	console.log(error.message);
	// 	res.status(500).send('No Such User Exists');
	// }
	try {
		var user = await Profile.findOne({ user_id: req.user.id });
		if (
			user.followers.filter(
				(follower) => follower.follower_id == req.params.id
			).length > 0
		) {
			return res.status(400).json({ msg: 'Already following' });
		}
		if (user.user_id == req.params.id) {
			return res.status(400).json({ msg: 'Cannot follow yourself' });
		}
		// check whether user is following themself
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Error Updating Users');
	}
	try {
		const follower = {
			follower_id: req.params.id,
		};
		Profile.updateOne(
			{ user_id: req.user.id },
			{ $push: { followers: follower } },
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Updated Followers');
					res.json('Follower Added');
				}
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Error Updating Users');
	}
});

module.exports = router;

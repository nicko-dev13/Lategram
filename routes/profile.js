const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { validationResult, check } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');

//@route PUT api/profile
//@desc Update profile
//@access Private
<<<<<<< HEAD
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
=======
router.put(
	'/',
	[auth, [check('about', 'About cannot be Empty').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		try {
			const profile = await Profile.findOneAndUpdate(
				{ user_id: req.user.id },
				{ about: req.body.about }
			);
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
>>>>>>> 59683cabc9521293cb9a06e71655c2c677e67f01
);

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
<<<<<<< HEAD
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
=======
>>>>>>> 59683cabc9521293cb9a06e71655c2c677e67f01
router.post('/follow/:id', auth, async (req, res) => {
	try {
		const followee = await Profile.findOne({ user_id: req.params.id });
		const follower = await Profile.findOne({ user_id: req.user.id });

		if (!followee) {
			return res.status(400).json({ msg: 'No User found' });
		}

		if (
			followee.followers.filter(
				(follower) => follower._id.toString() === req.user.id
			).length > 0
		) {
			return res.status(400).json({ msg: 'Already a Follwer' });
		}

		followee.followers.unshift({ _id: req.user.id });
		await followee.save();
		follower.following.unshift({ _id: req.params.id });
		await follower.save();
		res.json(follower);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');
const Profile = require('../models/Profile');

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
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

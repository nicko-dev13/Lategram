const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');
const Profile = require('../models/Profile');

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
router.post('/follow/:id', auth, async (req, res) => {
	var getFollower = await User.findOne({ _id: req.params.id });
	follower = {
		follower_id: getFollower._id,
	};
	try {
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
		res.status(500).send('Error Fetching Users');
	}
});

module.exports = router;

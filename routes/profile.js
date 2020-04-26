const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { validationResult, check } = require('express-validator');

const Post = require('../models/Post');
const Profile = require('../models/Profile');

//@route PUT api/profile
//@desc Update profile
//@access Private
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
);

//@route GET api/profile/following
//@desc Show the people user is following
//@access Private
router.get('/following', auth, async (req, res) => {
	try {
		const user = await Profile.findOne({ user_id: req.user.id });
		const following = user.following;
		res.json(following);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Server Error');
	}
});

//@route POST api/profile/follow/:id
//@desc Follow A User
//@access Private
router.post('/follow/:id', auth, async (req, res) => {
	try {
		const userToFollow = await Profile.findOne({ user_id: req.params.id });
		const user = await Profile.findOne({ user_id: req.user.id });

		if (!userToFollow) {
			return res.status(400).json({ msg: 'No User found' });
		}

		if (
			userToFollow.followers.filter(
				(user) => user._id.toString() === req.user.id
			).length > 0
		) {
			return res.status(400).json({ msg: 'Already a Follwer' });
		}

		userToFollow.followers.unshift({ _id: req.user.id });
		await userToFollow.save();
		user.following.unshift({ _id: req.params.id });
		await user.save();
		res.json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Server Error');
	}
});
//@route POST api/profile/unfollow/:id
//@desc unfollow A User
//@access Private
router.post('/unfollow/:id', auth, async (req, res) => {
	try {
		const userToUnfollow = await Profile.findOne({
			user_id: req.params.id,
		});
		const user = await Profile.findOne({ user_id: req.user.id });

		if (!userToUnfollow) {
			return res.status(400).json({ msg: 'No User found' });
		}

		if (
			userToUnfollow.followers.filter(
				(user) => user._id.toString() === req.user.id
			).length < 0
		) {
			return res.status(400).json({ msg: 'Not Follwing' });
		}

		var newFollowers = userToUnfollow.followers.filter(
			(follower) => follower._id != req.user.id
		);

		var newFollowing = user.following.filter(
			(follower) => follower._id != req.params.id
		);

		console.log(newFollowers);
		const updateUserToUnfollow = await Profile.findOneAndUpdate(
			{ user_id: req.params.id },
			{ followers: newFollowers }
		);
		const updateUser = await Profile.findOneAndUpdate(
			{ user_id: req.user.id },
			{ following: newFollowing }
		);
		console.log('Updated');
		res.json(userToUnfollow);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Server Error');
	}
});

//@route GET api/profile/feed
//@desc Get User's Feed
//@access Private
router.get('/feed', auth, async (req, res) => {
	try {
		const user = await Profile.findOne({ user_id: req.user.id });
		const following = user.following;
		const allPosts = await Post.find({});
		const postsOfFollowing = allPosts.filter(
			(post) =>
				following
					.map((followee) => followee._id)
					.indexOf(post.user_id) == 1
		);
		res.json(postsOfFollowing);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;

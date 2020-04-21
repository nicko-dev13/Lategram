const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

//@route GET api/posts
//@desc fetches the current users post
//@acess Private
router.get('/', auth, async (req, res) => {
	try {
		//Fetching User Posts by Id
		const user = await User.findOne({ _id: req.user.id });
		res.json(user.posts);
	} catch (error) {
		res.status(500).send('Server Error');
		console.log(error);
	}
});

//@route POST api/posts
//@desc Add Post to user's posts array
//@access Private
router.post(
	'/',
	[auth, [check('postContent', 'Please enter Post Content').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Adding post to db
		post = {
			postContent: req.body.postContent,
			createdAt: Date.now(),
		};
		try {
			User.updateOne(
				{ _id: req.user.id },
				{ $push: { posts: post } },
				function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log('Updated Document');
						res.json('Post Added');
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(500).send('Server Error');
		}
	}
);

//@route  PUT api/posts/:id
//@desc   Update posts
//@acess  Private

router.put('/:id', (req, res) => {
	res.send('Update Post');
});

//@route  DELETE api/post
//@desc   Delete post
//@acess  Private

router.delete('/:id', (req, res) => {
	res.send('Delete the post');
});

module.exports = router;

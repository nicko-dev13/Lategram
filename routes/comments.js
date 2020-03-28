const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const Comment = require('../models/Comments');

//@route POST api/comments
//@desc Posting comments to user posts
//@access Private
router.post(
	'/',
	[
		check('username', 'Please Enter a valid username').not().isEmpty(),
		check('comment', 'Comment field cannot be empty').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			//destructuring
			const { username, comment } = req.body;
			//assigning
			const newComment = new Comment({
				username,
				comment
			});
			//saving to database
			const saveComment = await newComment.save();
			//sending result
			res.json(saveComment);
		} catch (error) {
			console.log(error);
			res.send(500).json({ msg: 'Server Error' });
		}
	}
);

router.get('/', async (req, res) => {
	const result = Comment.find({}).exec(function(err, comment) {
		if (err) {
			console.log('error');
		} else {
			res.json(comment);
		}
	});
});
module.exports = router;

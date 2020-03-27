const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');

//@route POST api/comments
//@desc Posting comments to user posts
//@access Private
router.post('/', async (req, res) => {
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
});

module.exports = router;

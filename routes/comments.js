const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');

router.post('/', async (req, res) => {
	try {
		const { username, comment } = req.body;
		const newComment = new Comment({
			username,
			comment
		});

		const saveComment = await newComment.save();
		res.json(saveComment);
	} catch (error) {
		console.log(error);
		res.send(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;

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

router.get('/',async (req, res) => {
   const result= Comment.find({}).exec(function(err,comment){
        if(err){
            console.log('error');
        }
        else{
            res.json(comment);
        }
    })
});


router.put('/:id',async (req, res) => {
	const result= Comment.findOneAndUpdate(
		{
			_id:req.body.id
		},
		{
			comment:req.body.comment
		},
		{
			new:true,
			runValidators:true
		}
	).then(doc=>{
			res.json(result);

		}).catch(err=>{
			 console.log(err);
		 })
		 
});


router.delete('/:id',async (req, res) => {
	const result= Comment.findOneAndRemove(
		{
			_id:req.body.id
		}
	).then(doc=>{
			res.json(result);

		}).catch(err=>{
			 console.log(err);
		 })
		 
});

module.exports = router;

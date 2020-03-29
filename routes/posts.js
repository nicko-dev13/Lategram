const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const Post = require('../models/Posts');
const { check, validationResult } = require("express-validator");

//@route GET api/posts
//@desc fetches the current users post
//@acess Private
router.get('/', auth, async (req, res) => {
    try {
        //Fetching all the users where userID matches from token in descending order
        const posts = await Post.find({user: req.user.id}).sort({data: -1})
        res.json(posts)

    } catch (error) {
        res.status(500).send('Server Error');
		console.log(error);
    }
})


//@route POST api/posts
//@desc adds the post
//@acess Private
router.post('/',[
    auth, 
    [
        check('postTitle', 'Please enter a post Title').not().isEmpty(),
        check('post', 'Please enter the post').not().isEmpty()
    ]
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    //Adding post to db
    const {postTitle, post} = req.body;
 
    try {
        const newPost = new Post({
            postTitle : postTitle,
            post: post,
            user: req.user.id,
            comment:comment.split(',').map(comment=>{return{comment:comment}})
        });
        const savePost = await newPost.save();

        res.json(savePost);

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }

});

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
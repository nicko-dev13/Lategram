const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { validationResult, check } = require("express-validator");

const Comment = require("../models/Comments");
const Post = require("../models/Post");

//@route POST api/comments
//@desc Posting comments to user posts
//@access Private
router.post(
    "/:id",
    [auth, [check("comment", "Comment is Required").not().isEmpty()]],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // const { comment } = req.body;

            // const newComment = new Comment({
            //     comment: comment,
            //     postId: req.params.id,
            //     userId: req.user.id,
            // });

            // const saveComment = await newComment.save();

            // res.json(saveComment);

            const post = await Post.findById(req.params.id);
            const comment = await Comment.find({ user: req.user.id });

            if (comment) {
                return res
                    .status(400)
                    .json({ msg: "Already Commented on post" });
            }

            if (!post) {
                return res.status(404).json({ msg: "No Post found" });
            }

            if (req.user.id === post.user_id) {
                return res
                    .status(400)
                    .json({ msg: "Cannot comment on your own posts" });
            }
            console.log("Break Point 1");
            const newComment = new Comment({
                comment: req.body,
                postId: req.params.id,
                userId: req.user.id,
            });

            const saveComment = await newComment.save();

            res.json(saveComment);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;

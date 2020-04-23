const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

//@route GET api/posts
//@desc fetches the current users post
//@acess Private
router.get("/", auth, async (req, res) => {
  try {
    //Fetching User Posts by Id
    const posts = await Post.find({ user_id: req.user.id });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
});

//@route POST api/posts
//@desc adds the post
//@acess Private
router.post(
  "/",
  [
    auth,
    [check("postContent", "Please enter the Post Content").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Adding post to db
    const { postContent } = req.body;

    try {
      const newPost = new Post({
        postContent: postContent,
        user_id: req.user.id,
      });
      const savePost = await newPost.save();

      res.json(savePost);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

//@route  PUT api/posts/:id
//@desc   Update posts
//@acess  Private

router.put("/:id", (req, res) => {
  res.send("Update Post");
});

//@route  DELETE api/post
//@desc   Delete post
//@acess  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }

    if (req.user.id !== post.user_id.toString()) {
      return res.status(400).json({ msg: "User not Authorized" });
    }

    await post.remove();

    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//@route  Put api/post/like/:id
//@desc   Like Post
//@acess  Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter((like) => like.user.toString() === req.user.id) > 0) {
      res.status(400).json({ msg: "Post has already been liked" });
    }

    if (post.user_id.toString() === req.user.id) {
      res.status(400).json({ msg: "Cannot Like your own post" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//@route  Put api/post/unlike/:id
//@desc   Like Post
//@acess  Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter((like) => like.user.toString() === req.user.id) > 0) {
      return res.status(400).json({ msg: "Post has already been liked" });
    }

    if (post.user_id.toString() === req.user.id) {
      return res.status(400).json({ msg: "Cannot Like your own post" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

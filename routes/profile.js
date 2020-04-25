const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { validationResult, check } = require('express-validator');

const User = require('../models/User');
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
        const followee = await Profile.findOne({ user_id: req.params.id });
        const follower = await Profile.findOne({ user_id: req.user.id });

        if (!followee) {
            return res.status(400).json({ msg: 'No User found' });
        }

        if (
            followee.followers.filter(
                (follower) => follower._id.toString() === req.user.id
            ).length > 0
        ) {
            return res.status(400).json({ msg: 'Already a Follwer' });
        }

        followee.followers.unshift({ _id: req.user.id });
        await followee.save();
        follower.following.unshift({ _id: req.params.id });
        await follower.save();
        res.json(follower);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

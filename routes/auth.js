const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlewares/auth');
const { validationResult, check } = require('express-validator');

const router = express.Router();

const User = require('../models/User');

//@route get api/auth
//@desc Retrieves a user from db
//@access Private
router.get('/', auth, async (req, res) => {
	try {
		//Finds the user from database
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error.msg);
		res.status(500).json({ msg: 'Server Error' });
	}
});

//@route POST api/auth
//@desc authorize a user and get token (login into app)
//@access Public
router.post(
	'/',
	[
		check('email', 'Please Enter a valid email').isEmail(),
		check('password', 'Please enter your password').exists()
	],
	async (req, res) => {
		//Checking the validation errors
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//Destructuring
		const { email, password } = req.body;

		//Checking if the user exists or not else passing error
		try {
			const user = await User.findOne({ email: email });

			if (!user) {
				return res.status(400).json({
					msg: 'Invalid Credentials'
				});
			}
			//comparing passwords
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({
					msg: 'Invalid Credentials'
				});
			}
			//getting a jwt token
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'Server Error'
			});
		}
	}
);

module.exports = router;
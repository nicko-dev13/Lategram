//The Route Operations
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User');

//@route POST api/users
//@desc Registers a user
//@access Public
router.post(
	'/',
	[
		//Express vallidator for checking the fields
		check('name', 'Please Enter a Name').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password of 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		//Checking the validation results
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//destructuring name email password
		const { name, email, password } = req.body;

		try {
			//Checking if the email already exists
			let user = await User.findOne({ email: email });
			//if exists throwing error with status 400
			if (user) res.status(400).json({ msg: 'User already exists' });
			//else preparing for saving
			user = new User({
				name,
				email,
				password
			});
			//Creating salt for password
			const salt = await bcrypt.genSalt(10);
			//hasing password
			user.password = await bcrypt.hash(password, salt);
			//Saving to database
			await user.save();
			//assigning a payload for jwt
			const payload = {
				user: {
					id: user.id
				}
			};
			//getting a token through jwt sign
			jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			//Catching any error
			console.log(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;

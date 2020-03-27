const express = require('express');
const router = express.Router();

//@route get api/auth
//@desc Retrieves a user from db
//@access Private
router.get('/', (req, res) => {
	res.send('Getting the user from database');
});

//@route POST api/auth
//@desc authorize a user and get token
//@access Public
router.post('/', (req, res) => {
	res.send('Authorizing a user');
});

module.exports = router;

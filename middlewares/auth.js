//The Authentication middleware
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) {
		res.status(401).json({ msg: 'No token authorization denied' });
	}

	try {
		const decode = jwt.verify(token, config.get('jwtSecret'));

		req.user = decode.user;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'Invalid token acess denied'
		});
	}
};

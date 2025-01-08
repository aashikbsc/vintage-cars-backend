const { check, validationResult } = require('express-validator');

exports.signUpValidation =
[
	// Validate username
	check('username').trim().notEmpty().withMessage('Username is required').isLength({min:6, max:15}).withMessage('Username must be between 6 and 15 characters'),
	// Validate email
	check('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
	// Validate mobile number
	check('number').trim().notEmpty().withMessage('Mobile number is required').isString().withMessage('Mobile number must be a string.').isLength({max:10}).withMessage('Mobile number 10 digits long only').matches(/^[6-9]\d{9}$/).withMessage('Mobile number must be a valid Indian number starting with 6, 7, 8, or 9 and 10 digits long.'),
	// Validate password
	check('password').isLength({min:6, max:15}).withMessage('Password must be between 6 and 15 characters'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
exports.generateOTPValidation =
[
	// Validate mobile number
	check('number').trim().notEmpty().withMessage('Mobile number is required').isString().withMessage('Mobile number must be a string.').isLength({max:10}).withMessage('Mobile number 10 digits long only').matches(/^[6-9]\d{9}$/).withMessage('Mobile number must be a valid Indian number starting with 6, 7, 8, or 9 and 10 digits long.'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]

exports.loginValidation =
[
	// Validate email
	check('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
	// Validate password
	check('password').trim().notEmpty().withMessage('Password is required'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]

exports.updateUserInfoValidation =
[
	// Validate username
	check('username').trim().notEmpty().withMessage('Username is required').isLength({min:6, max:15}).withMessage('Username must be between 6 and 15 characters'),
	// Validate password
	check('password').isLength({min:6, max:15}).withMessage('Password must be between 6 and 15 characters'),
	// base64 validation
	check('image').trim().notEmpty().withMessage("Base64 string is required").bail().isBase64().withMessage("Invalid Base64 format"),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
exports.updateContactInfoValidation =
[
// Validate email
	check('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
	// Validate mobile number
	check('number').trim().notEmpty().withMessage('Mobile number is required').isString().withMessage('Mobile number must be a string.').isLength({max:10}).withMessage('Mobile number 10 digits long only').matches(/^[6-9]\d{9}$/).withMessage('Mobile number must be a valid Indian number starting with 6, 7, 8, or 9 and 10 digits long.'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
exports.deleteUserInfoValidation =
[
	// Validate user IDs
	check('userids').trim().notEmpty().withMessage('user IDs are required'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
const { check, validationResult } = require('express-validator');

exports.carInfoValidation =
[
	check('name').trim().notEmpty().withMessage('Name is required').isLength({max:50}).withMessage('Name must be a maximum of 50 characters.'),
	check('model').trim().notEmpty().withMessage('Model value is required.'),
	check('price').trim().notEmpty().withMessage('Price value is required.'),
	check('brand').trim().notEmpty().withMessage('Brand value is required.'),
	check('color').trim().notEmpty().withMessage('Color value is required.'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
exports.sliderInfoValidation =
[
	check('position').trim().notEmpty().withMessage('Position value is required.'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
exports.bookingValidation =
[
	check('name').trim().notEmpty().withMessage('Name is required.'),
	check('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email format'),
	check('number').trim().notEmpty().withMessage('Number is required.').isString().withMessage('Mobile number must be a string.').isLength({max:10}).withMessage('Mobile number 10 digits long only').matches(/^[6-9]\d{9}$/).withMessage('Mobile number must be a valid Indian number starting with 6, 7, 8, or 9 and 10 digits long.'),
	check('eventdate').trim().notEmpty().withMessage('Event date is required.'),
	check('from').trim().notEmpty().withMessage('From location is required.'),
	check('to').trim().notEmpty().withMessage('To location is required.'),
	check('carname').trim().notEmpty().withMessage('Car name is required.'),
	// Middleware to handle validation results
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
]
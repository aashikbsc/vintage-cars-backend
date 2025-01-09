const { check, validationResult } = require('express-validator');

exports.carInfoValidation =
[
	check('name').trim().notEmpty().withMessage('Name is required').isLength({min:6, max:50}).withMessage('Name must be between 6 and 50 characters'),
	check('model').trim().notEmpty().withMessage('Model value is required.'),
	check('price').trim().notEmpty().withMessage('Price value is required.'),
	check('brand').trim().notEmpty().withMessage('Brand value is required.'),
	check('color').trim().notEmpty().withMessage('Color value is required.'),
	check('image').trim().notEmpty().withMessage('Image data is required.'),
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
	check('image').trim().notEmpty().withMessage('Image data is required.'),
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
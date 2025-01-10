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
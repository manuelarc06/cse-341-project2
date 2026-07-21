const { body } = require('express-validator');

const petValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 2 })
            .withMessage('Name must contain at least 2 characters'),

        body('species')
            .trim()
            .notEmpty()
            .withMessage('Species is required'),

        body('breed')
            .trim()
            .notEmpty()
            .withMessage('Breed is required'),

        body('age')
            .isInt({ min: 0 })
            .withMessage('Age must be a positive integer'),

        body('gender')
            .trim()
            .notEmpty()
            .withMessage('Gender is required'),

        body('color')
            .trim()
            .notEmpty()
            .withMessage('Color is required'),

        body('weight')
            .isFloat({ min: 0 })
            .withMessage('Weight must be a positive number')
    ];
};

module.exports = petValidationRules;
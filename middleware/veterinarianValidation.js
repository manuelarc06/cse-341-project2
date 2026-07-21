const { body } = require('express-validator');

const veterinarianValidationRules = () => {
    return [
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('First name is required')
            .isLength({ min: 2 })
            .withMessage('First name must contain at least 2 characters'),

        body('lastName')
            .trim()
            .notEmpty()
            .withMessage('Last name is required')
            .isLength({ min: 2 })
            .withMessage('Last name must contain at least 2 characters'),

        body('specialty')
            .trim()
            .notEmpty()
            .withMessage('Specialty is required'),

        body('licenseNumber')
            .trim()
            .notEmpty()
            .withMessage('License number is required'),

        body('email')
            .trim()
            .isEmail()
            .withMessage('Invalid email'),

        body('phone')
            .trim()
            .notEmpty()
            .withMessage('Phone is required'),

        body('yearsExperience')
            .isInt({ min: 0 })
            .withMessage('Years of experience must be a positive integer'),

        body('clinic')
            .trim()
            .notEmpty()
            .withMessage('Clinic is required')
    ];
};

module.exports = veterinarianValidationRules;
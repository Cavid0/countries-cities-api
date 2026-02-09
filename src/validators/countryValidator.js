const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating a country
 */
const createCountryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Country name is required')
    .isLength({ max: 100 })
    .withMessage('Country name must not exceed 100 characters'),
  
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Country code is required')
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be exactly 2 characters')
    .isUppercase()
    .withMessage('Country code must be uppercase'),
  
  body('capital')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Capital name must not exceed 100 characters'),
  
  body('population')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Population must be a positive integer'),
  
  body('area')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area must be a positive number'),
  
  body('region')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Region must not exceed 50 characters'),
  
  body('subregion')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Subregion must not exceed 50 characters'),
  
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('flag_url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Flag URL must be a valid URL')
];

/**
 * Validation rules for updating a country
 */
const updateCountryValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid country ID'),
  
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Country name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Country name must not exceed 100 characters'),
  
  body('code')
    .optional()
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be exactly 2 characters')
    .isUppercase()
    .withMessage('Country code must be uppercase'),
  
  body('capital')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Capital name must not exceed 100 characters'),
  
  body('population')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Population must be a positive integer'),
  
  body('area')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area must be a positive number'),
  
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('flag_url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Flag URL must be a valid URL')
];

/**
 * Validation rules for getting a country by ID
 */
const getCountryByIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid country ID')
];

/**
 * Validation rules for query parameters
 */
const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('size')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Size must be between 1 and 100')
];

module.exports = {
  createCountryValidation,
  updateCountryValidation,
  getCountryByIdValidation,
  queryValidation
};

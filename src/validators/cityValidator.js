const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating a city
 */
const createCityValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('City name is required')
    .isLength({ max: 100 })
    .withMessage('City name must not exceed 100 characters'),
  
  body('country_id')
    .notEmpty()
    .withMessage('Country ID is required')
    .isUUID()
    .withMessage('Invalid country ID format'),
  
  body('population')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Population must be a positive integer'),
  
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('is_capital')
    .optional()
    .isBoolean()
    .withMessage('is_capital must be a boolean value')
];

/**
 * Validation rules for updating a city
 */
const updateCityValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid city ID'),
  
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('City name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('City name must not exceed 100 characters'),
  
  body('country_id')
    .optional()
    .isUUID()
    .withMessage('Invalid country ID format'),
  
  body('population')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Population must be a positive integer'),
  
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('is_capital')
    .optional()
    .isBoolean()
    .withMessage('is_capital must be a boolean value')
];

/**
 * Validation rules for getting a city by ID
 */
const getCityByIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid city ID')
];

/**
 * Validation rules for getting cities by country
 */
const getCitiesByCountryValidation = [
  param('countryId')
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
    .withMessage('Size must be between 1 and 100'),
  
  query('countryId')
    .optional()
    .isUUID()
    .withMessage('Invalid country ID format')
];

module.exports = {
  createCityValidation,
  updateCityValidation,
  getCityByIdValidation,
  getCitiesByCountryValidation,
  queryValidation
};

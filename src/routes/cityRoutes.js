const express = require('express');
const router = express.Router();
const {
  getAllCities,
  getCityById,
  getCitiesByCountry,
  createCity,
  updateCity,
  deleteCity,
  getCapitalCities
} = require('../controllers/cityController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { cache, clearCacheAfter } = require('../middleware/cache');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');
const {
  createCityValidation,
  updateCityValidation,
  getCityByIdValidation,
  getCitiesByCountryValidation,
  queryValidation
} = require('../validators/cityValidator');

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: City management endpoints
 */

/**
 * @swagger
 * /api/v1/cities/capitals:
 *   get:
 *     summary: Get all capital cities
 *     tags: [Cities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Capital cities retrieved successfully
 */
router.get('/capitals', queryValidation, validate, cache(300), getCapitalCities);

/**
 * @swagger
 * /api/v1/cities/country/{countryId}:
 *   get:
 *     summary: Get cities by country
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Cities retrieved successfully
 *       404:
 *         description: Country not found
 */
router.get('/country/:countryId', getCitiesByCountryValidation, queryValidation, validate, cache(300), getCitiesByCountry);

/**
 * @swagger
 * /api/v1/cities:
 *   get:
 *     summary: Get all cities with pagination
 *     tags: [Cities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: countryId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: isCapital
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Cities retrieved successfully
 */
router.get('/', apiLimiter, queryValidation, validate, cache(300), getAllCities);

/**
 * @swagger
 * /api/v1/cities/{id}:
 *   get:
 *     summary: Get city by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: City retrieved successfully
 *       404:
 *         description: City not found
 */
router.get('/:id', getCityByIdValidation, validate, cache(300), getCityById);

/**
 * @swagger
 * /api/v1/cities:
 *   post:
 *     summary: Create a new city (Admin only)
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       201:
 *         description: City created successfully
 *       404:
 *         description: Country not found
 */
router.post('/', authenticate, isAdmin, createCityValidation, validate, clearCacheAfter('*'), createCity);

/**
 * @swagger
 * /api/v1/cities/{id}:
 *   put:
 *     summary: Update a city (Admin only)
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       200:
 *         description: City updated successfully
 *       404:
 *         description: City not found
 */
router.put('/:id', authenticate, isAdmin, updateCityValidation, validate, clearCacheAfter('*'), updateCity);

/**
 * @swagger
 * /api/v1/cities/{id}:
 *   delete:
 *     summary: Delete a city (Admin only)
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: City deleted successfully
 *       404:
 *         description: City not found
 */
router.delete('/:id', authenticate, isAdmin, getCityByIdValidation, validate, clearCacheAfter('*'), deleteCity);

module.exports = router;

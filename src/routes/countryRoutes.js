const express = require('express');
const router = express.Router();
const {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  getCountryStats
} = require('../controllers/countryController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { cache, clearCacheAfter } = require('../middleware/cache');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');
const {
  createCountryValidation,
  updateCountryValidation,
  getCountryByIdValidation,
  queryValidation
} = require('../validators/countryValidator');

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Country management endpoints
 */

/**
 * @swagger
 * /api/v1/countries/stats:
 *   get:
 *     summary: Get country statistics
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
router.get('/stats', cache(600), getCountryStats);

/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     summary: Get all countries with pagination
 *     tags: [Countries]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page (max 100)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, code, or capital
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region
 *       - in: query
 *         name: subregion
 *         schema:
 *           type: string
 *         description: Filter by subregion
 *     responses:
 *       200:
 *         description: Countries retrieved successfully
 */
router.get('/', apiLimiter, queryValidation, validate, cache(300), getAllCountries);

/**
 * @swagger
 * /api/v1/countries/{id}:
 *   get:
 *     summary: Get country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Country ID
 *       - in: query
 *         name: includeCities
 *         schema:
 *           type: boolean
 *         description: Include cities
 *     responses:
 *       200:
 *         description: Country retrieved successfully
 *       404:
 *         description: Country not found
 */
router.get('/:id', getCountryByIdValidation, validate, cache(300), getCountryById);

/**
 * @swagger
 * /api/v1/countries:
 *   post:
 *     summary: Create a new country (Admin only)
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     responses:
 *       201:
 *         description: Country created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/', authenticate, isAdmin, createCountryValidation, validate, clearCacheAfter('*'), createCountry);

/**
 * @swagger
 * /api/v1/countries/{id}:
 *   put:
 *     summary: Update a country (Admin only)
 *     tags: [Countries]
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
 *             $ref: '#/components/schemas/Country'
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       404:
 *         description: Country not found
 */
router.put('/:id', authenticate, isAdmin, updateCountryValidation, validate, clearCacheAfter('*'), updateCountry);

/**
 * @swagger
 * /api/v1/countries/{id}:
 *   delete:
 *     summary: Delete a country (Admin only)
 *     tags: [Countries]
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
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 */
router.delete('/:id', authenticate, isAdmin, getCountryByIdValidation, validate, clearCacheAfter('*'), deleteCountry);

module.exports = router;

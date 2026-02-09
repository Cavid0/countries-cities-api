const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const countryRoutes = require('./countryRoutes');
const cityRoutes = require('./cityRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/cities', cityRoutes);

module.exports = router;

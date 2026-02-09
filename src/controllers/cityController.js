const { City, Country } = require('../models');
const { Op } = require('sequelize');

/**
 * Helper function for pagination
 */
const getPagination = (page, size) => {
  const limit = size ? +size : parseInt(process.env.ITEMS_PER_PAGE) || 20;
  const offset = page ? (page - 1) * limit : 0;
  
  return { limit, offset };
};

/**
 * Helper function to format pagination response
 */
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    items,
    totalPages,
    currentPage,
    itemsPerPage: limit
  };
};

/**
 * @desc    Get all cities with pagination
 * @route   GET /api/v1/cities
 * @access  Public
 */
const getAllCities = async (req, res, next) => {
  try {
    const { page = 1, size, search, countryId, isCapital } = req.query;
    const { limit, offset } = getPagination(page, size);

    // Build where clause for filtering
    const where = {};
    
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    if (countryId) {
      where.country_id = countryId;
    }

    if (isCapital !== undefined) {
      where.is_capital = isCapital === 'true';
    }

    const data = await City.findAndCountAll({
      where,
      limit,
      offset,
      include: [{
        model: Country,
        as: 'country',
        attributes: ['id', 'name', 'code']
      }],
      order: [['name', 'ASC']]
    });

    const response = getPagingData(data, page, limit);

    res.status(200).json({
      success: true,
      message: 'Cities retrieved successfully',
      data: response
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single city by ID
 * @route   GET /api/v1/cities/:id
 * @access  Public
 */
const getCityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const city = await City.findOne({
      where: { id },
      include: [{
        model: Country,
        as: 'country'
      }]
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'City retrieved successfully',
      data: { city }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get cities by country ID
 * @route   GET /api/v1/cities/country/:countryId
 * @access  Public
 */
const getCitiesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const { page = 1, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    // Check if country exists
    const country = await Country.findByPk(countryId);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    const data = await City.findAndCountAll({
      where: { country_id: countryId },
      limit,
      offset,
      order: [['population', 'DESC']]
    });

    const response = getPagingData(data, page, limit);

    res.status(200).json({
      success: true,
      message: 'Cities retrieved successfully',
      data: {
        country: {
          id: country.id,
          name: country.name,
          code: country.code
        },
        ...response
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new city
 * @route   POST /api/v1/cities
 * @access  Private (Admin only)
 */
const createCity = async (req, res, next) => {
  try {
    const { country_id } = req.body;

    // Verify country exists
    const country = await Country.findByPk(country_id);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    const city = await City.create(req.body);

    // Fetch city with country details
    const cityWithCountry = await City.findOne({
      where: { id: city.id },
      include: [{
        model: Country,
        as: 'country',
        attributes: ['id', 'name', 'code']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'City created successfully',
      data: { city: cityWithCountry }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update city
 * @route   PUT /api/v1/cities/:id
 * @access  Private (Admin only)
 */
const updateCity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    // If country_id is being updated, verify it exists
    if (req.body.country_id && req.body.country_id !== city.country_id) {
      const country = await Country.findByPk(req.body.country_id);
      
      if (!country) {
        return res.status(404).json({
          success: false,
          message: 'Country not found'
        });
      }
    }

    await city.update(req.body);

    // Fetch updated city with country details
    const updatedCity = await City.findOne({
      where: { id },
      include: [{
        model: Country,
        as: 'country',
        attributes: ['id', 'name', 'code']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'City updated successfully',
      data: { city: updatedCity }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete city
 * @route   DELETE /api/v1/cities/:id
 * @access  Private (Admin only)
 */
const deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    await city.destroy();

    res.status(200).json({
      success: true,
      message: 'City deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get capital cities
 * @route   GET /api/v1/cities/capitals
 * @access  Public
 */
const getCapitalCities = async (req, res, next) => {
  try {
    const { page = 1, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const data = await City.findAndCountAll({
      where: { is_capital: true },
      limit,
      offset,
      include: [{
        model: Country,
        as: 'country',
        attributes: ['id', 'name', 'code', 'region']
      }],
      order: [['name', 'ASC']]
    });

    const response = getPagingData(data, page, limit);

    res.status(200).json({
      success: true,
      message: 'Capital cities retrieved successfully',
      data: response
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCities,
  getCityById,
  getCitiesByCountry,
  createCity,
  updateCity,
  deleteCity,
  getCapitalCities
};

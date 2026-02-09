const { Country, City } = require('../models');
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
 * @desc    Get all countries with pagination
 * @route   GET /api/v1/countries
 * @access  Public
 */
const getAllCountries = async (req, res, next) => {
  try {
    const { page = 1, size, search, region, subregion } = req.query;
    const { limit, offset } = getPagination(page, size);

    // Build where clause for filtering
    const where = {};
    
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
        { capital: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (region) {
      where.region = { [Op.iLike]: `%${region}%` };
    }

    if (subregion) {
      where.subregion = { [Op.iLike]: `%${subregion}%` };
    }

    const data = await Country.findAndCountAll({
      where,
      limit,
      offset,
      order: [['name', 'ASC']]
    });

    const response = getPagingData(data, page, limit);

    res.status(200).json({
      success: true,
      message: 'Countries retrieved successfully',
      data: response
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single country by ID
 * @route   GET /api/v1/countries/:id
 * @access  Public
 */
const getCountryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includeCities } = req.query;

    const queryOptions = {
      where: { id }
    };

    // Optionally include cities
    if (includeCities === 'true') {
      queryOptions.include = [{
        model: City,
        as: 'cities',
        limit: 20
      }];
    }

    const country = await Country.findOne(queryOptions);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Country retrieved successfully',
      data: { country }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new country
 * @route   POST /api/v1/countries
 * @access  Private (Admin only)
 */
const createCountry = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Country created successfully',
      data: { country }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update country
 * @route   PUT /api/v1/countries/:id
 * @access  Private (Admin only)
 */
const updateCountry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    await country.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Country updated successfully',
      data: { country }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete country
 * @route   DELETE /api/v1/countries/:id
 * @access  Private (Admin only)
 */
const deleteCountry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    await country.destroy();

    res.status(200).json({
      success: true,
      message: 'Country deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get country statistics
 * @route   GET /api/v1/countries/stats
 * @access  Public
 */
const getCountryStats = async (req, res, next) => {
  try {
    const totalCountries = await Country.count();
    const regions = await Country.findAll({
      attributes: [
        'region',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: ['region'],
      raw: true
    });

    res.status(200).json({
      success: true,
      message: 'Country statistics retrieved successfully',
      data: {
        totalCountries,
        byRegion: regions
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  getCountryStats
};

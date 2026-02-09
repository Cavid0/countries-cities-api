const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *           description: Country name
 *         code:
 *           type: string
 *           description: ISO 3166-1 alpha-2 country code
 *         capital:
 *           type: string
 *           description: Capital city
 *         population:
 *           type: integer
 *           description: Country population
 *         area:
 *           type: number
 *           format: float
 *           description: Country area in square kilometers
 *         region:
 *           type: string
 *           description: Geographic region
 *         subregion:
 *           type: string
 *           description: Geographic subregion
 *         latitude:
 *           type: number
 *           format: float
 *           description: Latitude coordinate
 *         longitude:
 *           type: number
 *           format: float
 *           description: Longitude coordinate
 *         flagUrl:
 *           type: string
 *           description: URL to country flag image
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const Country = sequelize.define('countries', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 2],
      isUppercase: true
    }
  },
  capital: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  population: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 0
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Area in square kilometers'
  },
  region: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  subregion: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: -180,
      max: 180
    }
  },
  flag_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['code'] },
    { fields: ['name'] },
    { fields: ['region'] }
  ]
});

module.exports = Country;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - name
 *         - countryId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *           description: City name
 *         countryId:
 *           type: string
 *           format: uuid
 *           description: ID of the country this city belongs to
 *         population:
 *           type: integer
 *           description: City population
 *         latitude:
 *           type: number
 *           format: float
 *           description: Latitude coordinate
 *         longitude:
 *           type: number
 *           format: float
 *           description: Longitude coordinate
 *         isCapital:
 *           type: boolean
 *           description: Whether this city is a capital
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const City = sequelize.define('cities', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'countries',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  population: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 0
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
  is_capital: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['name'] },
    { fields: ['country_id'] },
    { fields: ['is_capital'] }
  ]
});

module.exports = City;

const User = require('./User');
const Country = require('./Country');
const City = require('./City');

// Define associations
Country.hasMany(City, {
  foreignKey: 'country_id',
  as: 'cities',
  onDelete: 'CASCADE'
});

City.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country'
});

module.exports = {
  User,
  Country,
  City
};

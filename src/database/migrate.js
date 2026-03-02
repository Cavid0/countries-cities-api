require('dotenv').config();
const sequelize = require('../config/database');

const runMigrations = async () => {
  try {
    console.log('Running database migrations...');

    await sequelize.authenticate();
    console.log('Database connection established.');

    await sequelize.sync({ alter: true });
    console.log('Database schema updated successfully.');

    console.log('Migrations completed!');
    process.exit(0);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();

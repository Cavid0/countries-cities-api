require('dotenv').config();
const sequelize = require('../config/database');

/**
 * Script to run database migrations
 * This can be expanded to include more sophisticated migration logic
 */
const runMigrations = async () => {
  try {
    console.log('🔄 Running database migrations...');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database schema updated successfully.');

    console.log('✅ Migrations completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migrations
runMigrations();

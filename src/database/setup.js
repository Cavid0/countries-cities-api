require('dotenv').config();
const sequelize = require('../config/database');
const { User, Country, City } = require('../models');

/**
 * Script to set up the database
 * Creates all tables based on models
 */
const setupDatabase = async () => {
  try {
    console.log('🔄 Starting database setup...');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync all models
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database tables created/updated successfully.');

    // Create default admin user if it doesn't exist
    const [adminUser, created] = await User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        username: 'admin',
        email: 'admin@example.com',
        password: 'Admin123',
        role: 'admin'
      }
    });

    if (created) {
      console.log('✅ Default admin user created:');
      console.log('   Email: admin@example.com');
      console.log('   Password: Admin123');
      console.log('   ⚠️  Please change the password after first login!');
    } else {
      console.log('ℹ️  Admin user already exists.');
    }

    console.log('✅ Database setup completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
};

// Run setup
setupDatabase();

require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 3000;

// Function to start the server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync database models (for development only)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('✅ Database models synchronized.');
    }

    // Test Redis connection (optional - won't crash if Redis is unavailable)
    try {
      await redisClient.connect();
      console.log('✅ Redis connection established successfully.');
    } catch (redisError) {
      console.warn('⚠️  Redis not available - caching will be disabled');
      console.warn('⚠️  Redis error:', redisError.message);
      // Continue without Redis - app will work without caching
    }

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
      console.log(`🔗 Health check available at http://localhost:${PORT}/health`);
    });

  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠️  SIGINT signal received: closing HTTP server');
  await sequelize.close();
  await redisClient.quit();
  console.log('✅ Database and Redis connections closed.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
  await sequelize.close();
  await redisClient.quit();
  console.log('✅ Database and Redis connections closed.');
  process.exit(0);
});

// Start the server
startServer();

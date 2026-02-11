const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    reconnectStrategy: (retries) => {
      // Stop reconnecting after 3 attempts (cloud deployment without Redis)
      if (retries > 3) {
        console.log('⚠️  Redis connection failed after 3 attempts - disabling Redis');
        return false; // Stop reconnecting
      }
      // Wait 1 second between retries
      return 1000;
    }
  },
  password: process.env.REDIS_PASSWORD || undefined,
  legacyMode: false
});

redisClient.on('error', (err) => {
  // Only log first error, avoid spam
  if (!redisClient.isErrorLogged) {
    console.warn('⚠️  Redis Client Error:', err.message);
    redisClient.isErrorLogged = true;
  }
});

redisClient.on('connect', () => {
  console.log('🔄 Redis Client connecting...');
});

redisClient.on('ready', () => {
  console.log('✅ Redis Client ready');
  redisClient.isErrorLogged = false; // Reset error logging
});

module.exports = redisClient;

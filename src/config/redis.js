const redis = require('redis');

// Check if Redis is enabled
const isRedisEnabled = process.env.REDIS_ENABLED === 'true';

if (!isRedisEnabled) {
  console.log('⚠️  Redis is disabled (REDIS_ENABLED != true)');
  // Return a mock client that does nothing
  module.exports = {
    isOpen: false,
    connect: async () => {},
    get: async () => null,
    setEx: async () => {},
    del: async () => {},
    quit: async () => {}
  };
} else {
  // Upstash REST API configuration (preferred for serverless)
  const redisUrl = process.env.REDIS_URL;
  const redisToken = process.env.REDIS_TOKEN;

  // Traditional Redis configuration (fallback for local dev)
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = process.env.REDIS_PORT || 6379;
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisTls = process.env.REDIS_TLS === 'true';

  let redisClient;

  // Use Upstash if URL provided (cloud deployment)
  if (redisUrl) {
    console.log('🔴 Configuring Upstash Redis (serverless)');
    
    // Extract host from URL (remove https:// prefix)
    const redisHost = redisUrl.replace(/^https?:\/\//, '');
    
    // Upstash uses TLS by default on port 6379
    const clientConfig = {
      socket: {
        host: redisHost,
        port: 6379,
        tls: true,
        rejectUnauthorized: true
      }
    };

    // Add token or password if provided
    if (redisToken) {
      clientConfig.password = redisToken;
    } else if (redisPassword) {
      clientConfig.password = redisPassword;
    }

    redisClient = redis.createClient(clientConfig);
  } else {
    // Use traditional Redis connection (local dev)
    console.log('🔴 Configuring traditional Redis connection');
    redisClient = redis.createClient({
      socket: {
        host: redisHost,
        port: redisPort,
        tls: redisTls,
        reconnectStrategy: (retries) => {
          if (retries > 3) {
            console.log('⚠️  Redis connection failed after 3 attempts - disabling Redis');
            return false;
          }
          return 1000;
        }
      },
      password: redisPassword || undefined,
      legacyMode: false
    });
  }

  redisClient.on('error', (err) => {
    if (!redisClient.isErrorLogged) {
      console.warn('⚠️  Redis Client Error:', err.message);
      redisClient.isErrorLogged = true;
    }
  });

  redisClient.on('connect', () => {
    console.log('🔄 Redis Client connecting...');
  });

  redisClient.on('ready', () => {
    console.log('✅ Redis Client ready and connected');
    redisClient.isErrorLogged = false;
  });

  module.exports = redisClient;
}

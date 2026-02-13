const redis = require('redis');

const isRedisEnabled = process.env.REDIS_ENABLED === 'true';

if (!isRedisEnabled) {
  console.log('⚠️  Redis is disabled (REDIS_ENABLED != true)');
  module.exports = {
    isOpen: false,
    connect: async () => {},
    get: async () => null,
    setEx: async () => {},
    del: async () => {},
    quit: async () => {}
  };
} else {
  const redisUrl = process.env.REDIS_URL;
  const redisToken = process.env.REDIS_TOKEN;

  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = process.env.REDIS_PORT || 6379;
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisTls = process.env.REDIS_TLS === 'true';

  let redisClient;

  if (redisUrl) {
    console.log('🔴 Configuring Upstash Redis (serverless)');
    
    const redisHost = redisUrl.replace(/^https?:\/\//, '');
    
    const clientConfig = {
      socket: {
        host: redisHost,
        port: 6379,
        tls: true,
        rejectUnauthorized: true
      }
    };

    if (redisToken) {
      clientConfig.password = redisToken;
    } else if (redisPassword) {
      clientConfig.password = redisPassword;
    }

    redisClient = redis.createClient(clientConfig);
  } else {
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

const redisClient = require('../config/redis');

const cache = (duration = 300) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    if (!redisClient.isOpen) {
      return next();
    }

    const cacheKey = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return res.status(200).json({
          ...JSON.parse(cachedData),
          cached: true,
          cacheKey
        });
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      const originalJson = res.json.bind(res);

      res.json = async (data) => {
        if (res.statusCode === 200) {
          try {
            await redisClient.setEx(
              cacheKey,
              duration,
              JSON.stringify(data)
            );
            console.log(`💾 Cached: ${cacheKey} for ${duration}s`);
          } catch (cacheError) {
            console.error('Cache save error:', cacheError);
          }
        }

        return originalJson(data);
      };

      next();

    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

const clearCache = async (pattern = '*') => {
  try {
    const keys = await redisClient.keys(`cache:${pattern}`);
    
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🗑️  Cleared ${keys.length} cache entries matching: ${pattern}`);
      return keys.length;
    }
    
    return 0;
  } catch (error) {
    console.error('Clear cache error:', error);
    return 0;
  }
};

const clearCacheAfter = (pattern = '*') => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = async (data) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        await clearCache(pattern);
      }

      return originalJson(data);
    };

    next();
  };
};

module.exports = {
  cache,
  clearCache,
  clearCacheAfter
};

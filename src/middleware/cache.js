const redisClient = require('../config/redis');

/**
 * Cache middleware with Redis
 * @param {number} duration - Cache duration in seconds
 */
const cache = (duration = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create cache key from request URL and query parameters
    const cacheKey = `cache:${req.originalUrl || req.url}`;

    try {
      // Check if data exists in cache
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

      // Store the original res.json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = async (data) => {
        // Cache the successful response
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

        // Call the original json function
        return originalJson(data);
      };

      next();

    } catch (error) {
      console.error('Cache middleware error:', error);
      // Continue without caching if Redis fails
      next();
    }
  };
};

/**
 * Clear cache for specific pattern
 */
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

/**
 * Middleware to clear cache after mutations
 */
const clearCacheAfter = (pattern = '*') => {
  return async (req, res, next) => {
    // Store the original res.json function
    const originalJson = res.json.bind(res);

    // Override res.json to clear cache after successful mutation
    res.json = async (data) => {
      // Clear cache for successful mutations (POST, PUT, DELETE)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        await clearCache(pattern);
      }

      // Call the original json function
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

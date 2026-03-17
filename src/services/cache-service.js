/**
 * Cache utility for localStorage with TTL support
 */

const CACHE_PREFIX = "raijin_cache_";
const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

export const cacheService = {
  /**
   * Set item in cache with TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (default: 30 min)
   */
  set: (key, value, ttl = DEFAULT_TTL) => {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      const cacheData = {
        value,
        timestamp: Date.now(),
        ttl,
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn("Cache set error:", error);
    }
  },

  /**
   * Get item from cache if not expired
   * @param {string} key - Cache key
   * @returns {any} Cached value or null if expired/missing
   */
  get: (key) => {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      const cacheData = localStorage.getItem(cacheKey);

      if (!cacheData) return null;

      const { value, timestamp, ttl } = JSON.parse(cacheData);
      const isExpired = Date.now() - timestamp > ttl;

      if (isExpired) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return value;
    } catch (error) {
      console.warn("Cache get error:", error);
      return null;
    }
  },

  /**
   * Remove item from cache
   * @param {string} key - Cache key
   */
  remove: (key) => {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn("Cache remove error:", error);
    }
  },

  /**
   * Clear all cached items
   */
  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn("Cache clear error:", error);
    }
  },
};

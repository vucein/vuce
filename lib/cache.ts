/**
 * Simple caching utility for API responses
 * Uses localStorage with TTL (Time To Live)
 */

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface CachedData<T> {
  data: T;
  timestamp: number;
}

export const cache = {
  /**
   * Get cached data if it exists and hasn't expired
   */
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const cached: CachedData<T> = JSON.parse(item);
      const now = Date.now();
      
      // Check if cache has expired
      if (now - cached.timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      
      return cached.data;
    } catch {
      // Invalid cache data, remove it
      localStorage.removeItem(key);
      return null;
    }
  },

  /**
   * Set data in cache with current timestamp
   */
  set: <T>(key: string, data: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const cached: CachedData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cached));
    } catch {
      // Storage full or disabled - silently fail
    }
  },

  /**
   * Remove cached data
   */
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  /**
   * Clear all cache entries with a specific prefix
   */
  clear: (prefix: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // Silently fail
    }
  },
};

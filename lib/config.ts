/**
 * Centralized configuration for the application
 * Uses environment variables with sensible defaults
 */

const config = {
  api: {
    ipapi: process.env.NEXT_PUBLIC_IPAPI_URL || 'https://ipapi.co/json/',
    currency: process.env.NEXT_PUBLIC_CURRENCY_API_URL || 'https://open.er-api.com/v6/latest/USD',
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Vuce',
  },
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    errorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
  },
} as const;

export default config;

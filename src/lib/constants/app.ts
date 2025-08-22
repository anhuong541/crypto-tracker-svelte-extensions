// Application-wide constants
export const APP = {
  NAME: 'Coinmarketcap Tracker',
  VERSION: '1.0.0',
  EXTENSION_WIDTH: 320,
  EXTENSION_MAX_HEIGHT: 600,
} as const

// API Configuration
export const API = {
  COINMARKETCAP: {
    BASE_URL: 'https://pro-api.coinmarketcap.com',
    VERSION: 'v1',
    ENDPOINTS: {
      QUOTES_LATEST: '/cryptocurrency/quotes/latest',
      INFO: '/cryptocurrency/info',
    },
    HEADERS: {
      API_KEY: 'X-CMC_PRO_API_KEY',
    },
  },
  IMAGES: {
    CMC_ICON_BASE: 'https://s2.coinmarketcap.com/static/img/coins/64x64',
  },
} as const

// UI Constants
export const UI = {
  COLORS: {
    PRIMARY: '#3861fb',
    SECONDARY: '#1877f2',
    SUCCESS: '#28a745',
    WARNING: '#ffc107',
    ERROR: '#ff6b6b',
    DANGER: '#dc3545',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#212529',
    MUTED: '#6c757d',
    BORDER: '#e1e5ea',
  },
  SIZES: {
    ICON_SMALL: 16,
    ICON_MEDIUM: 24,
    ICON_LARGE: 32,
    BORDER_RADIUS: 4,
    SHADOW: '0 2px 4px rgba(0, 0, 0, 0.05)',
    SHADOW_HOVER: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  TRANSITIONS: {
    FAST: '0.2s',
    NORMAL: '0.3s',
    SLOW: '0.5s',
  },
} as const

// Links
export const LINKS = {
  COINMARKETCAP: 'https://coinmarketcap.com/',
  getCurrencyPage: (slug: string) => `https://coinmarketcap.com/currencies/${slug}/`,
} as const

// Validation Rules
export const VALIDATION = {
  API_KEY: {
    MIN_LENGTH: 36,
    PATTERN: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i,
  },
  SYMBOL: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 10,
    PATTERN: /^[A-Z]+$/,
  },
} as const

// Import base URL from dedicated file
import { BASE_URL } from './baseUrl';

// API Configuration - Use deployed Lambda backend
export const API_BASE_URL = BASE_URL;

// Debug logging for API configuration
console.log('Environment:', import.meta.env.MODE);
console.log('API_BASE_URL:', API_BASE_URL);

// App Configuration
export const APP_CONFIG = {
  name: 'Nowest Interior Ltd',
  description: 'Luxury Blinds & Curtains Handcrafted in the UK Since 2002',
  version: '1.0.0',
  author: 'Nowest Interior Ltd',
  contact: {
    email: 'info@nowestinterior.com',
    phone: '+44 20 1234 5678',
    address: 'London, UK'
  },
  social: {
    instagram: 'https://instagram.com/nowestinterior',
    facebook: 'https://facebook.com/nowestinterior',
    twitter: 'https://twitter.com/nowestinterior'
  }
};

// Feature Flags
export const FEATURES = {
  enableAnalytics: (import.meta as any).env?.VITE_ENABLE_ANALYTICS === 'true',
  enablePWA: (import.meta as any).env?.VITE_ENABLE_PWA === 'true',
  enableDarkMode: (import.meta as any).env?.VITE_ENABLE_DARK_MODE === 'true',
  enableAdminPanel: (import.meta as any).env?.VITE_ENABLE_ADMIN_PANEL === 'true'
};

// API Endpoints
export const API_ENDPOINTS = {
  // Public endpoints
  PRODUCTS: '/api/products',
  PORTFOLIO: '/api/portfolio',
  LEADS: '/api/leads',
  BROCHURES: '/api/brochures',
  SEO: '/api/seo/home', // Fixed: requires page parameter
  PAGEVIEW: '/api/pageview',
  HEALTH: '/health',
  
  // Admin endpoints
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LOGOUT: '/api/admin/logout',
  ADMIN_ME: '/api/admin/me',
  ADMIN_PRODUCTS: '/api/admin/products',
  ADMIN_PORTFOLIO: '/api/admin/portfolio',
  ADMIN_LEADS: '/api/admin/leads',
  ADMIN_SEO: '/api/admin/seo',
  ADMIN_BROCHURES: '/api/admin/brochures',
  ADMIN_ANALYTICS: '/api/analytics/stats', // Fixed: matches backend endpoint
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf'],
  imageQuality: 0.8,
  maxImageWidth: 1920,
  maxImageHeight: 1080
};

// Pagination Configuration
export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 100,
  pageSizeOptions: [12, 24, 48, 96]
};

// Cache Configuration
export const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  staleWhileRevalidate: 60 * 1000 // 1 minute
};

// Form Validation
export const VALIDATION = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    required: true,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be between 10 and 1000 characters'
  }
};

// Theme Configuration
export const THEME = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  fonts: {
    primary: 'Inter, sans-serif',
    heading: 'Playfair Display, serif'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Animation Configuration
export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  server: 'Server error. Please try again later.',
  unauthorized: 'You are not authorized to perform this action.',
  forbidden: 'Access denied.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  upload: 'File upload failed. Please try again.',
  generic: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  saved: 'Changes saved successfully.',
  deleted: 'Item deleted successfully.',
  uploaded: 'File uploaded successfully.',
  sent: 'Message sent successfully.',
  updated: 'Updated successfully.',
  created: 'Created successfully.'
};

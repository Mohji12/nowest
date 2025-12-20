import { BASE_URL } from '@/lib/baseUrl';
import { API_ENDPOINTS } from '@/lib/config';

// Authentication removed - direct access enabled

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to create timeout promise
const createTimeoutPromise = (timeoutMs: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${timeoutMs}ms`)), timeoutMs);
  });
};

// Generic API request function with retry logic
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Debug logging (only on first attempt)
  if (retryCount === 0) {
    console.log('API Request:', {
      url,
      endpoint,
      baseUrl: BASE_URL,
      mode: (import.meta as any).env?.MODE,
      options: { ...options }
    });
  } else {
    console.log(`API Request Retry ${retryCount}/${MAX_RETRIES}:`, url);
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers,
    credentials: 'omit', // Changed to omit for Lambda URL
    mode: 'cors', // Explicitly set CORS mode
  };

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    // Race between fetch and timeout
    const fetchPromise = fetch(url, { 
      ...defaultOptions, 
      ...options,
      signal: controller.signal 
    });
    
    const response = await Promise.race([
      fetchPromise,
      createTimeoutPromise(REQUEST_TIMEOUT)
    ]) as Response;
    
    clearTimeout(timeoutId);

    // Log response (only on first attempt or errors)
    if (retryCount === 0 || !response.ok) {
      console.log('API Response:', {
        url,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
    }

    if (!response.ok) {
      // Retry on 500 errors (server errors) or 503 (service unavailable)
      if ((response.status === 500 || response.status === 503) && retryCount < MAX_RETRIES) {
        const delayMs = RETRY_DELAY * Math.pow(2, retryCount); // Exponential backoff
        console.warn(`Server error ${response.status}, retrying in ${delayMs}ms...`);
        await delay(delayMs);
        return apiRequest<T>(endpoint, options, retryCount + 1);
      }
      
      // Create a more detailed error object
      const error = new Error(`API request failed: ${response.status} ${response.statusText}`) as any;
      error.status = response.status;
      error.statusText = response.statusText;
      error.url = url;
      
      // Try to get error details from response
      try {
        const errorData = await response.json();
        error.detail = errorData.detail || errorData.message || errorData.error;
        console.error('API Error Details:', errorData);
        
        // Provide user-friendly error messages
        if (response.status === 500) {
          error.userMessage = 'Server error: The backend service is experiencing issues. Please try again later.';
        } else if (response.status === 503) {
          error.userMessage = 'Service unavailable: The service is temporarily down. Please try again later.';
        } else if (response.status === 404) {
          error.userMessage = 'Resource not found: The requested data could not be found.';
        } else {
          error.userMessage = error.detail || 'An error occurred while fetching data.';
        }
      } catch {
        // If we can't parse JSON, use the status text
        error.detail = response.statusText;
        if (response.status === 500) {
          error.userMessage = 'Server error: The backend service is experiencing issues. This might be due to database connection problems.';
        } else {
          error.userMessage = response.statusText || 'An error occurred while fetching data.';
        }
      }
      
      throw error;
    }

    return response.json();
  } catch (error: any) {
    // Retry on network errors or timeouts
    if (
      (error.name === 'TypeError' || error.name === 'AbortError' || error.message?.includes('timeout')) &&
      retryCount < MAX_RETRIES
    ) {
      const delayMs = RETRY_DELAY * Math.pow(2, retryCount);
      console.warn(`Network error, retrying in ${delayMs}ms...`, error.message);
      await delay(delayMs);
      return apiRequest<T>(endpoint, options, retryCount + 1);
    }
    
    // Log error details
    console.error('API request error:', error);
    console.error('Request URL:', url);
    console.error('Request options:', { ...defaultOptions, ...options });
    console.error('Environment:', {
      mode: (import.meta as any).env?.MODE,
      baseUrl: BASE_URL,
      isDev: (import.meta as any).env?.DEV
    });
    
    // Enhance error with user-friendly message if not already set
    if (!error.userMessage) {
      if (error.name === 'AbortError' || error.message?.includes('timeout')) {
        error.userMessage = 'Request timeout: The server took too long to respond. Please check your connection and try again.';
      } else if (error.name === 'TypeError' && error.message?.includes('fetch')) {
        error.userMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
      } else {
        error.userMessage = 'An unexpected error occurred. Please try again later.';
      }
    }
    
    throw error;
  }
}

// Page view tracking - with silent error handling
export async function trackPageView(data: {
  page: string;
  userAgent: string;
  referrer: string | null;
}) {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.PAGEVIEW}`;
    
    // Add timeout to prevent hanging requests - reduced to 3 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'omit',
      mode: 'cors',
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Page view tracking failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Silently fail for page view tracking - only log in development
    const isDev = (import.meta as any).env?.DEV || (import.meta as any).env?.MODE === 'development';
    if (isDev) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Page view tracking timed out (backend may not be running)');
      } else if (error instanceof Error && error.message?.includes('fetch')) {
        console.warn('Page view tracking failed: Backend server may not be running');
      }
    }
    // In production, completely silent - don't log anything
    return null;
  }
}

// Health check
export async function healthCheck() {
  return apiRequest(API_ENDPOINTS.HEALTH);
}

// Products API
export async function getProducts() {
  try {
    return await apiRequest(API_ENDPOINTS.PRODUCTS);
  } catch (error) {
    console.error('Products API error:', error);
    throw error;
  }
}

// Portfolio API
export async function getPortfolio() {
  try {
    return await apiRequest(API_ENDPOINTS.PORTFOLIO);
  } catch (error) {
    console.error('Portfolio API error:', error);
    throw error;
  }
}

// Brochures API
export async function getBrochures() {
  try {
    return await apiRequest(API_ENDPOINTS.BROCHURES);
  } catch (error) {
    console.error('Brochures API error:', error);
    throw error;
  }
}

// SEO API
export async function getSEO(page: string) {
  return apiRequest(`${API_ENDPOINTS.SEO}?page=${page}`);
}

// Leads API
export async function createLead(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return apiRequest(API_ENDPOINTS.LEADS, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Admin API - Authentication removed, direct access enabled

// Admin Products
export async function getAdminProducts() {
  return apiRequest(API_ENDPOINTS.ADMIN_PRODUCTS);
}

export async function createAdminProduct(data: any) {
  return apiRequest(API_ENDPOINTS.ADMIN_PRODUCTS, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAdminProduct(id: string, data: any) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_PRODUCTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAdminProduct(id: string) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_PRODUCTS}/${id}`, {
    method: 'DELETE',
  });
}

// Admin Portfolio
export async function getAdminPortfolio() {
  return apiRequest(API_ENDPOINTS.ADMIN_PORTFOLIO);
}

export async function createAdminPortfolioItem(data: any) {
  return apiRequest(API_ENDPOINTS.ADMIN_PORTFOLIO, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAdminPortfolioItem(id: string, data: any) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_PORTFOLIO}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAdminPortfolioItem(id: string) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_PORTFOLIO}/${id}`, {
    method: 'DELETE',
  });
}

// Admin Leads
export async function getAdminLeads() {
  return apiRequest(API_ENDPOINTS.ADMIN_LEADS);
}

export async function updateAdminLead(id: string, data: any) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_LEADS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updateAdminLeadStatus(id: string, status: string) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_LEADS}/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function deleteAdminLead(id: string) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_LEADS}/${id}`, {
    method: 'DELETE',
  });
}

// Admin SEO
export async function getAdminSeo() {
  return apiRequest(API_ENDPOINTS.ADMIN_SEO);
}

export async function getAdminSeoByPage(page: string) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_SEO}/${page}`);
}

export async function updateAdminSeo(page: string, data: any) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_SEO}/${page}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function upsertAdminSeo(data: any) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_SEO}/upsert`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Admin Brochures
export async function getAdminBrochures() {
  return apiRequest(API_ENDPOINTS.ADMIN_BROCHURES);
}

export async function createAdminBrochure(data: any) {
  return apiRequest(API_ENDPOINTS.ADMIN_BROCHURES, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAdminBrochure(id: string, data: any) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_BROCHURES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAdminBrochure(id: string) {
  return apiRequest(`${API_ENDPOINTS.ADMIN_BROCHURES}/${id}`, {
    method: 'DELETE',
  });
}

// Admin SEO
export async function getAdminSEO() {
  return apiRequest(API_ENDPOINTS.ADMIN_SEO);
}

export async function updateAdminSEO(data: any) {
  return apiRequest(API_ENDPOINTS.ADMIN_SEO, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Admin Analytics
export async function getAdminAnalytics() {
  return apiRequest(API_ENDPOINTS.ADMIN_ANALYTICS);
}

export async function getAdminTopPages() {
  return apiRequest('/api/admin/analytics/pageviews');
}

export async function getRecentPageViews() {
  return apiRequest('/api/analytics/page-views');
}

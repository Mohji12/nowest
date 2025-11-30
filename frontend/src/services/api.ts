import { BASE_URL } from '@/lib/baseUrl';
import { API_ENDPOINTS } from '@/lib/config';

// Authentication removed - direct access enabled

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Debug logging
  console.log('API Request:', {
    url,
    endpoint,
    baseUrl: BASE_URL,
    mode: (import.meta as any).env?.MODE,
    options: { ...options }
  });
  
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
    const response = await fetch(url, { ...defaultOptions, ...options });

    console.log('API Response:', {
      url,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      // Create a more detailed error object
      const error = new Error(`API request failed: ${response.status} ${response.statusText}`) as any;
      error.status = response.status;
      error.statusText = response.statusText;
      error.url = url;
      
      // Try to get error details from response
      try {
        const errorData = await response.json();
        error.detail = errorData.detail || errorData.message;
        console.error('API Error Details:', errorData);
      } catch {
        // If we can't parse JSON, use the status text
        error.detail = response.statusText;
      }
      
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    console.error('Request URL:', url);
    console.error('Request options:', { ...defaultOptions, ...options });
    console.error('Environment:', {
      mode: (import.meta as any).env?.MODE,
      baseUrl: BASE_URL,
      isDev: (import.meta as any).env?.DEV
    });
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
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
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
    // Silently fail for page view tracking - don't disrupt user experience
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Page view tracking timed out');
    } else {
      console.warn('Page view tracking failed:', error);
    }
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

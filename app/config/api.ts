// API Configuration
export const API_CONFIG = {
  // შეცვალე შენი backend URL-ით
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  
  ENDPOINTS: {
    CATEGORIES: '/categories/with-subcategories',
    MAIN_CATEGORIES: '/categories',
  },
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
};

// Helper function for API requests
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: API_CONFIG.HEADERS,
    ...options,
  };

  // Add timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
} 
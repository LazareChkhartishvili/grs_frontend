// API Configuration
export const API_CONFIG = {
  // შეცვალე შენი backend URL-ით
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://grs-bkbc.onrender.com",
  ENDPOINTS: {
    CATEGORIES: "/api/categories/with-subcategories",
    MAIN_CATEGORIES: "/api/categories",
    COMPLEXES: "/api/complexes",
    EXERCISES: "/api/exercises",
  },

  HEADERS: {
    "Content-Type": "application/json",
  },

  TIMEOUT: 10000,
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: API_CONFIG.HEADERS,
    ...options,
  };

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

export async function fetchMainCategories<T>(): Promise<T> {
  return apiRequest<T>(API_CONFIG.ENDPOINTS.MAIN_CATEGORIES);
}

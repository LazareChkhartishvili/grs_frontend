import { User } from "../components/PersonalAccount/PersonInfo";

interface RegistrationData {
  email: string;
  password: string;
  name: string;
  phone: string;
  location: string;
  diseases?: string[];
  additionalInfo?: string;
  verificationCode?: string;
}

// API Configuration
export const API_CONFIG = {
  // შეცვალე შენი backend URL-ით
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://grs-bkbc.onrender.com",
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  ENDPOINTS: {
    CATEGORIES: "/api/categories/with-subcategories",
    MAIN_CATEGORIES: "/api/categories",
    COMPLEXES: "/api/complexes",
    EXERCISES: "/api/exercises",
    AUTH: {
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
      REFRESH_TOKEN: "/api/auth/refresh-token",
      SEND_VERIFICATION: "/api/auth/send-verification",
      VERIFY_CODE: "/api/auth/verify-code",
      RESEND_CODE: "/api/auth/resend-code",
    },
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
    headers: {
      ...API_CONFIG.HEADERS,
      ...(localStorage.getItem("token")
        ? {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        : {}),
    },
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

// Auth functions
export async function login(email: string, password: string) {
  return apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(userData: RegistrationData) {
  return apiRequest<User>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function logout() {
  return apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
    method: "POST",
  });
}

// ვერიფიკაციის ფუნქციები
export async function sendVerificationCode(email: string) {
  return apiRequest(API_CONFIG.ENDPOINTS.AUTH.SEND_VERIFICATION, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyCode(email: string, code: string) {
  return apiRequest(API_CONFIG.ENDPOINTS.AUTH.VERIFY_CODE, {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

export async function resendVerificationCode(email: string) {
  return apiRequest(API_CONFIG.ENDPOINTS.AUTH.RESEND_CODE, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

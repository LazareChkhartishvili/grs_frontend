"use client";

import { useState, useEffect } from "react";
import { CategoryItem } from "../context/CategoryContext";

// Import the BackendCategory type structure
interface BackendCategory {
  _id: string;
  id: number;
  name: string;
  description?: string;
  image?: string;
  backgroundImage?: string;
  subcategories?: Array<{
    _id: string;
    name: string;
    description?: string;
    categoryId?: string;
    exercises?: unknown[];
    image?: string;
    isActive?: boolean;
    sortOrder?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }>;
  sets?: unknown[]; // Added for the new structure
}

interface UseCategoriesReturn {
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function getFallbackCategories(): CategoryItem[] {
  return [
    {
      id: 1,
      _id: "fallback_1",
      title: "Ортопедия",
      backgroundImage: "/assets/images/blog.png",
      categoryImage: "/assets/images/services/category.png",
      items: [
        "ШЕЙНЫЙ ОТДЕЛ ПОЗВОНОЧНИКА",
        "ГРУДНОЙ ОТДЕЛ ПОЗВОНОЧНИКА",
        "ПРОБЛЕМЫ ВЕРХНИХ КОНЕЧНОСТЕЙ",
        "ПРОБЛЕМЫ НИЖНИХ КОНЕЧНОСТЕЙ",
      ],
      subcategories: [
        { id: 1, name: "ШЕЙНЫЙ ОТДЕЛ ПОЗВОНОЧНИКА" },
        { id: 2, name: "ГРУДНОЙ ОТДЕЛ ПОЗВОНОЧНИКА" },
        { id: 3, name: "ПРОБЛЕМЫ ВЕРХНИХ КОНЕЧНОСТЕЙ" },
        { id: 4, name: "ПРОБЛЕМЫ НИЖНИХ КОНЕЧНОСТЕЙ" },
      ],
    },
    {
      id: 2,
      _id: "fallback_2",
      title: "Терапия",
      backgroundImage: "/assets/images/blog.png",
      categoryImage: "/assets/images/services/course2.png",
      items: [
        "КАРДИОЛОГИЯ",
        "НЕВРОЛОГИЯ",
        "ЭНДОКРИНОЛОГИЯ",
        "ГАСТРОЭНТЕРОЛОГИЯ",
      ],
      subcategories: [
        { id: 5, name: "КАРДИОЛОГИЯ" },
        { id: 6, name: "НЕВРОЛОГИЯ" },
        { id: 7, name: "ЭНДОКРИНОЛОГИЯ" },
        { id: 8, name: "ГАСТРОЭНТЕРОЛОГИЯ" },
      ],
    },
    {
      id: 3,
      _id: "fallback_3",
      title: "Хирургия",
      backgroundImage: "/assets/images/blog.png",
      categoryImage: "/assets/images/services/cousre1.png",
      items: [
        "ОБЩАЯ ХИРУРГИЯ",
        "ПЛАСТИЧЕСКАЯ ХИРУРГИЯ",
        "НЕЙРОХИРУРГИЯ",
        "КАРДИОХИРУРГИЯ",
      ],
      subcategories: [
        { id: 9, name: "ОБЩАЯ ХИРУРГИЯ" },
        { id: 10, name: "ПЛАСТИЧЕСКАЯ ХИРУРГИЯ" },
        { id: 11, name: "НЕЙРОХИРУРГИЯ" },
        { id: 12, name: "КАРДИОХИРУРГИЯ" },
      ],
    },
  ];
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { apiRequest, API_CONFIG } = await import("../config/api");

      const endpoint = "/api/categories/full-structure";
      console.log("📡 API Endpoint:", `${API_CONFIG.BASE_URL}${endpoint}`);

      const backendCategories: BackendCategory[] = await apiRequest<
        BackendCategory[]
      >(endpoint);

      if (!Array.isArray(backendCategories)) {
        throw new Error("API response is not an array");
      }

      const transformedCategories: CategoryItem[] = backendCategories.map(
        (category, index) => {
          const transformed = {
            id: category.id || index + 1,
            _id: category._id,
            title: category.name || `Category ${index + 1}`,
            backgroundImage:
              category.backgroundImage || "/assets/images/blog.png",
            categoryImage:
              category.image || "/assets/images/services/category.png",
            items: category.subcategories?.map((sub) => sub.name) || [],
            subcategories:
              category.subcategories?.map((subRaw: Record<string, unknown>) => {
                const sub = subRaw as { [key: string]: unknown };
                return {
                  id: parseInt((sub._id as string).slice(-8), 16),
                  name: sub.name as string,
                  description: sub.description as string | undefined,
                  sets:
                    "sets" in sub && Array.isArray(sub.sets)
                      ? (sub.sets as import("../types/exercise").Set[])
                      : Array.isArray(sub.exercises)
                      ? (sub.exercises as import("../types/exercise").Set[])
                      : [],
                };
              }) || [],
            sets: (category.sets as import("../types/exercise").Set[]) || [],
          };
          return transformed;
        }
      );

      setCategories(transformedCategories);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      const fallbackCategories = getFallbackCategories();
      setCategories(fallbackCategories);
      setError(
        err instanceof Error ? err.message : "API Error - using fallback data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

// SWR Version - გამოიყენე მხოლოდ თუ SWR დაინსტალირებული გაქვს
// npm install swr
/*
import useSWR from 'swr';

export function useCategoriesSWR() {
  const fetcher = async () => {
    const { apiRequest } = await import('../config/api');
    return apiRequest<BackendCategory[]>('/api/categories/complete-hierarchy');
  };

  const { data, error, isLoading, mutate } = useSWR(
    '/api/categories/complete-hierarchy',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      errorRetryCount: 3
    }
  );

  return {
    categories: data || [],
    loading: isLoading,
    error: error?.message || null,
    refetch: mutate
  };
}
*/

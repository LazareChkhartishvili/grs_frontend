"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Set as SetType } from "../types/exercise";

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
    sets?: unknown[];
  }>;
  sets?: unknown[];
}

export interface CategoryItem {
  id: number;
  _id: string; // MongoDB ObjectId
  title: string;
  backgroundImage: string;
  categoryImage: string;
  items: string[]; // subcategories names (legacy)
  subcategories: {
    id: number;
    name: string;
    description?: string;
    sets?: SetType[];
  }[];
  sets?: SetType[];
}

interface CategoryContextType {
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

async function fetchCategories(): Promise<CategoryItem[]> {
  try {
    const { apiRequest, API_CONFIG } = await import("../config/api");

    const endpoint = "/api/categories/full-structure";
    console.log("📡 API Endpoint:", `${API_CONFIG.BASE_URL}${endpoint}`);

    const backendCategories: BackendCategory[] = await apiRequest<
      BackendCategory[]
    >(endpoint);

    // Transform data
    const transformedCategories: CategoryItem[] = backendCategories.map(
      (category, index) => {
        const transformed = {
          id: category.id || index + 1, // Fallback ID if missing
          _id: category._id,
          title: category.name || `Category ${index + 1}`,
          backgroundImage:
            category.backgroundImage || "/assets/images/blog.png",
          categoryImage:
            category.image || "/assets/images/services/category.png",
          items: category.subcategories?.map((sub) => sub.name) || [],
          subcategories:
            category.subcategories?.map((sub) => ({
              id: parseInt(sub._id.slice(-8), 16),
              name: sub.name,
              description: sub.description,
              sets: (sub.sets as SetType[]) || [],
            })) || [],
          sets: (category.sets as SetType[]) || [],
        };
        return transformed;
      }
    );

    return transformedCategories;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return getFallbackCategories();
  }
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
        { id: 1, name: "ШЕЙНЫЙ ОТДЕЛ ПОЗВОНОЧНИКА", sets: [] as SetType[] },
        { id: 2, name: "ГРУДНОЙ ОТДЕЛ ПОЗВОНОЧНИКА", sets: [] as SetType[] },
        { id: 3, name: "ПРОБЛЕМЫ ВЕРХНИХ КОНЕЧНОСТЕЙ", sets: [] as SetType[] },
        { id: 4, name: "ПРОБЛЕМЫ НИЖНИХ КОНЕЧНОСТЕЙ", sets: [] as SetType[] },
      ],
      sets: [] as SetType[],
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
        { id: 5, name: "КАРДИОЛОГИЯ", sets: [] as SetType[] },
        { id: 6, name: "НЕВРОЛОГИЯ", sets: [] as SetType[] },
        { id: 7, name: "ЭНДОКРИНОЛОГИЯ", sets: [] as SetType[] },
        { id: 8, name: "ГАСТРОЭНТЕРОЛОГИЯ", sets: [] as SetType[] },
      ],
      sets: [] as SetType[],
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
        { id: 9, name: "ОБЩАЯ ХИРУРГИЯ", sets: [] as SetType[] },
        { id: 10, name: "ПЛАСТИЧЕСКАЯ ХИРУРГИЯ", sets: [] as SetType[] },
        { id: 11, name: "НЕЙРОХИРУРГИЯ", sets: [] as SetType[] },
        { id: 12, name: "КАРДИОХИРУРГИЯ", sets: [] as SetType[] },
      ],
      sets: [] as SetType[],
    },
  ];
}

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error loading categories";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const value: CategoryContextType = {
    categories,
    loading,
    error,
    refetch: loadCategories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}

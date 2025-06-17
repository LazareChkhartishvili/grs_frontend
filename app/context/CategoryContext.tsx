"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CategoryItem {
  id: number;
  title: string;
  backgroundImage: string;
  categoryImage: string;
  items: string[]; // subcategories names (legacy)
  subcategories?: Array<{
    id: number;
    name: string;
    description?: string;
  }>; // Full subcategory data with IDs
}

interface BackendCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
  backgroundImage?: string;
  subcategories?: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
}

interface CategoryContextType {
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

async function fetchCategories(): Promise<CategoryItem[]> {
  try {
    const { apiRequest, API_CONFIG } = await import('../config/api');
    
    const endpoint = '/api/categories/with-subcategories';
    console.log('📡 API Endpoint:', `${API_CONFIG.BASE_URL}${endpoint}`);
    
    const backendCategories: BackendCategory[] = await apiRequest<BackendCategory[]>(endpoint);
    const transformedCategories: CategoryItem[] = backendCategories.map((category) => {
      
      return {
        id: category.id,
        title: category.name,
        backgroundImage: category.backgroundImage || '/assets/images/blog.png', 
        categoryImage: category.image || '/assets/images/services/category.png',
        items: category.subcategories?.map(sub => sub.name) || [],
        subcategories: category.subcategories
      };
    });

    
    return transformedCategories;
    
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return getFallbackCategories();
  }
}

function getFallbackCategories(): CategoryItem[] {
  return [
    {
      id: 1,
      title: "Ортопедия",
      backgroundImage: "/assets/images/blog.png",
      categoryImage: "/assets/images/services/category.png",
      items: [
        "ШЕЙНЫЙ ОТДЕЛ ПОЗВОНОЧНИКА",
        "ГРУДНОЙ ОТДЕЛ ПОЗВОНОЧНИКА", 
        "ПРОБЛЕМЫ ВЕРХНИХ КОНЕЧНОСТЕЙ",
        "ПРОБЛЕМЫ НИЖНИХ КОНЕЧНОСТЕЙ"
      ]
    },
    {
      id: 2,
      title: "Терапия",
      backgroundImage: "/assets/images/blog.png",
      categoryImage: "/assets/images/services/course2.png",
      items: [
        "КАРДИОЛОГИЯ",
        "НЕВРОЛОГИЯ",
        "ЭНДОКРИНОЛОГИЯ",
        "ГАСТРОЭНТЕРОЛОГИЯ"
      ]
    },
    {
      id: 3,
      title: "Хирургия",
      backgroundImage: "/assets/images/blog.png",
      categoryImage: "/assets/images/services/cousre1.png",
      items: [
        "ОБЩАЯ ХИРУРГИЯ",
        "ПЛАСТИЧЕСКАЯ ХИРУРГИЯ",
        "НЕЙРОХИРУРГИЯ",
        "КАРДИОХИРУРГИЯ"
      ]
    }
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
      const errorMessage = err instanceof Error ? err.message : 'Error loading categories';
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
    refetch: loadCategories
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
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
} 
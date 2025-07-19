/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { apiRequest } from '../config/api';
import { MultiLanguageField, Set, Subcategory } from '../types/category';

export interface CategoryCompleteData {
  category: {
    _id: string;
    name: MultiLanguageField;
    description?: MultiLanguageField;
    image?: string;
    subcategories: Subcategory[];
    sets: Set[];
    isActive: boolean;
    sortOrder: number;
    isPublished: boolean;
  };
  sets: Set[];
  subcategories: Subcategory[];
}

interface UseCategoryCompleteReturn {
  categoryData: CategoryCompleteData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategoryComplete(categoryId: string): UseCategoryCompleteReturn {
  const [categoryData, setCategoryData] = useState<CategoryCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryComplete = async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      setError(null);

      console.log("🔗 Fetching complete category data for ID:", categoryId);
      
      const endpoint = `/categories/${categoryId}/complete`;
      console.log("🔗 API endpoint:", endpoint);

      const response = await apiRequest<CategoryCompleteData>(endpoint);
      
      console.log("✅ Category complete data received:", response);
      setCategoryData(response);
    } catch (err) {
      console.error("❌ Error fetching category complete data:", err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoryComplete();
    }
  }, [categoryId]);

  return {
    categoryData,
    loading,
    error,
    refetch: fetchCategoryComplete,
  };
} 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "../config/api";
import { MultiLanguageField, Subcategory } from "../types/category";

export interface CategoryCompleteData {
  category: {
    _id: string;
    name: MultiLanguageField;
    description?: MultiLanguageField;
    image?: string;
    subcategories: Subcategory[];
    sets: any;
    isActive: boolean;
    sortOrder: number;
    isPublished: boolean;
  };
  sets: any;
  subcategories: Subcategory[];
}

interface UseCategoryCompleteReturn {
  categoryData: CategoryCompleteData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategoryComplete(
  categoryId: string
): UseCategoryCompleteReturn {
  const [categoryData, setCategoryData] = useState<CategoryCompleteData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryComplete = useCallback(async () => {
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
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryComplete();
    }
  }, [categoryId, fetchCategoryComplete]);

  return {
    categoryData,
    loading,
    error,
    refetch: fetchCategoryComplete,
  };
}

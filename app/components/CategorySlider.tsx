"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCategories } from "../hooks/useCategories";
import SubcategoryDropdown from "./SubcategoryDropdown";

const getValidImageUrl = (url: string | undefined, fallback: string): string => {
  if (!url) return fallback;
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.startsWith('/')) {
    return url;
  }
  
  if (url && !url.startsWith('/') && !url.startsWith('http')) {
    return fallback;
  }
  
  return fallback;
};

interface CategorySliderProps {
  onCategoryClick?: (categoryId: number, categoryTitle: string) => void;
}

const CategorySlider = ({ onCategoryClick }: CategorySliderProps) => {
  const { categories, loading, error } = useCategories();
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number, categoryTitle: string, event?: React.MouseEvent) => {
    if (onCategoryClick) {
      event?.preventDefault();
      onCategoryClick(categoryId, categoryTitle);
    }
  };

  const handleDropdownToggle = (categoryId: number, event: React.MouseEvent) => {
    console.log('🔧 handleDropdownToggle called:', { categoryId, currentClickedCategory: clickedCategory });
    event.preventDefault();
    event.stopPropagation();
    
    if (clickedCategory === categoryId) {
      console.log('🔄 Closing dropdown (same category)');
      setClickedCategory(null);
    } else {
      console.log('🔄 Opening dropdown for category:', categoryId);
      setClickedCategory(categoryId);
    }
    
    console.log('🔧 State should change to:', clickedCategory === categoryId ? null : categoryId);
  };

  const handleDropdownClose = () => {
    setClickedCategory(null);
  };

  const isDropdownOpen = (categoryId: number) => {
    return clickedCategory === categoryId;
  };

  // Debug state changes
  useEffect(() => {
    console.log('🔄 clickedCategory state changed to:', clickedCategory);
  }, [clickedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (target.closest('.dropdown-arrow') || target.closest('.dropdown-content')) {
        return;
      }
      
      console.log('🖱️ Clicking outside, closing dropdown');
      setClickedCategory(null);
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="relative md:mt-10">
        <div className="flex items-center gap-[14px] md:gap-[26px]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 animate-pulse">
              <div className="bg-gray-200 rounded-[20px] w-[240px] h-[140px] md:w-[455px] md:h-[230px]">
                <div className="p-4">
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative md:mt-10">
        <div className="text-red-500 text-center p-4">
          Error loading categories: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative md:mt-10">
      <div className="flex items-start gap-[14px] md:gap-[26px] overflow-x-auto scrollbar-hide overflow-y-visible">
        {categories.map((category) => {
          const backgroundImageUrl = getValidImageUrl(
            category.backgroundImage, 
            '/assets/images/blog.png'
          );
          const categoryImageUrl = getValidImageUrl(
            category.categoryImage,
            '/assets/images/services/category.png'
          );

          const hasSubcategories = category.subcategories && category.subcategories.length > 0;

          return (
            <div
              key={category.id}
              className="flex-shrink-0 flex flex-col relative z-10 overflow-visible"
            >
              <Link 
                href={`/categories/${category.id}`}
                onClick={(e) => handleCategoryClick(category.id, category.title, e)}
                className="group cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <div
                  className="bg-cover bg-center rounded-[20px] w-[240px] h-[140px] md:w-[455px] md:h-[230px]"
                  style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
                  <Image
                    src={categoryImageUrl}
                    width={232}
                    height={82}
                    alt={category.title}
                    className="mx-auto rounded-[14px] p-[4px] md:w-[443px] md:h-[153px]"
                    onError={(e) => {
                      console.error(`❌ Image load error for category ${category.id}:`, e);
                    }}
                  />
                  <div className="flex items-center justify-between bg-white py-2 md:py-4 px-4 mx-[4px] rounded-[20px] text-black group-hover:bg-gray-50 transition-colors duration-300">
                    <h4 className="text-[14px] md:text-[24px] bg-gradient-to-r from-[#734ea4] to-[#3f1a70] bg-clip-text text-transparent font-playfair font-semibold">
                      {category.title}
                    </h4>

                    <div 
                      className="bg-[#E9DFF6] w-6 h-6 flex items-center justify-center rounded group-hover:bg-[#D4BAFC] transition-colors cursor-pointer relative z-20 dropdown-arrow"
                      data-category-id={category.id}
                      onClick={(e) => {
                        console.log('🖱️ Arrow clicked! Category:', category.id, 'hasSubcategories:', hasSubcategories);
                        if (hasSubcategories) {
                          console.log('🔄 Calling handleDropdownToggle...');
                          handleDropdownToggle(category.id, e);
                        } else {
                          console.log('❌ No subcategories found');
                        }
                      }}
                    >
                      {hasSubcategories ? (
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform duration-200 ${isDropdownOpen(category.id) ? 'rotate-90' : ''}`}
                        >
                          <path 
                            d="M9 18L15 12L9 6" 
                            stroke="#734ea4" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M9 18L15 12L9 6" 
                            stroke="#734ea4" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* Subcategory Dropdown */}
              <SubcategoryDropdown 
                subcategories={category.subcategories || []}
                isOpen={isDropdownOpen(category.id)}
                onClose={handleDropdownClose}
              />
            </div>
          );
        })}
      </div>
      <hr className="md:mt-10 bg-[#D5D1DB] text-[#D5D1DB]" />
    </div>
  );
};

export default CategorySlider;

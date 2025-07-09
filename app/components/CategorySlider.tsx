"use client";

import Image from "next/image";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useCategories } from "../hooks/useCategories";
import SubcategoryDropdown from "./SubcategoryDropdown";

const backgrounds = [
  "/assets/images/categorySliderBgs/bg1.jpg",
  "/assets/images/categorySliderBgs/bg2.jpg",
  "/assets/images/categorySliderBgs/bg3.png",
  "/assets/images/categorySliderBgs/bg1.jpg",
];

const getValidImageUrl = (
  url: string | undefined,
  fallback: string
): string => {
  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return fallback;
};

interface CategorySliderProps {
  onCategoryClick?: (categoryId: string, categoryTitle: string) => void;
}

const CategorySlider = forwardRef<HTMLDivElement, CategorySliderProps>(
  ({ onCategoryClick }, ref) => {
    const { categories, loading, error } = useCategories();
    const [clickedCategory, setClickedCategory] = useState<string | null>(null);

    // დებაგ ლოგები
    useEffect(() => {
      console.log("🔍 Categories Data:", {
        categories,
        loading,
        error,
        firstCategory: categories[0],
      });
    }, [categories, loading, error]);

    useImperativeHandle(ref, () => sliderRef.current as HTMLDivElement);

    const sliderRef = React.useRef<HTMLDivElement | null>(null);

    const handleCategoryClick = (
      categoryId: string,
      categoryTitle: string,
      event?: React.MouseEvent
    ) => {
      if (onCategoryClick) {
        event?.preventDefault();
        onCategoryClick(categoryId, categoryTitle);
      }
    };

    const handleDropdownToggle = (
      categoryId: string,
      event: React.MouseEvent
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setClickedCategory((prev) => (prev === categoryId ? null : categoryId));
    };

    const handleDropdownClose = () => setClickedCategory(null);
    const isDropdownOpen = (categoryId: string) =>
      clickedCategory === categoryId;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
          target.closest(".dropdown-arrow") ||
          target.closest(".dropdown-content")
        ) {
          return;
        }
        setClickedCategory(null);
      };

      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    if (loading) {
      return (
        <div className="relative md:mt-10 mt-5">
          <div className="flex items-center gap-[14px] md:gap-[26px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 animate-pulse">
                <div className="bg-gray-200 rounded-[20px] w-[240px] h-[140px] md:w-[455px] md:h-[230px]"></div>
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
      <div className="relative md:mt-10 mt-2">
        <div
          ref={sliderRef}
          className="flex items-start gap-[14px] md:gap-[26px] overflow-x-auto scrollbar-hide overflow-y-visible md:overflow-hidden scroll-smooth"
        >
          {categories.map((category) => {
            console.log("🎯 Rendering category:", {
              id: category.id,
              _id: category._id,
              title: category.title,
            });

            const backgroundImageUrl =
              backgrounds[category.id % backgrounds.length];
            const categoryImageUrl = getValidImageUrl(
              category.categoryImage,
              "/assets/images/services/category.png"
            );

            const hasSubcategories =
              category.subcategories && category.subcategories.length > 0;

            return (
              <div
                key={category._id}
                className="flex-shrink-0 flex flex-col relative z-10 overflow-visible"
              >
                <Link
                  href={`/categories/${category._id}`}
                  onClick={(e) => {
                    console.log("🖱️ Category clicked:", {
                      id: category.id,
                      _id: category._id,
                      title: category.title,
                    });
                    handleCategoryClick(category._id, category.title, e);
                  }}
                  className="group cursor-pointer transform transition-transform duration-300"
                >
                  <div
                    className="bg-cover rounded-[20px] w-[240px] h-[140px] md:w-[455px] md:h-[230px]"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                  >
                    <Image
                      src={categoryImageUrl}
                      width={232}
                      height={82}
                      alt={category.title}
                      className="mx-auto rounded-[14px] p-[4px] md:w-[443px] md:h-[153px]"
                    />
                    <div className="flex items-center justify-between bg-white py-2 md:py-4 px-4 mx-[4px] rounded-[20px] text-black group-hover:bg-gray-50 transition-colors duration-300">
                      <h4 className="text-[14px] md:text-[24px] bg-gradient-to-r from-[#734ea4] to-[#3f1a70] bg-clip-text  font-playfair font-semibold">
                        {category.title}
                      </h4>
                      <div
                        className="bg-[#E9DFF6] w-6 h-6 flex items-center justify-center rounded group-hover:bg-[#D4BAFC] transition-colors cursor-pointer relative z-20 dropdown-arrow"
                        onClick={(e) => {
                          if (hasSubcategories) {
                            handleDropdownToggle(category._id, e);
                          }
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform duration-200 ${
                            isDropdownOpen(category._id) ? "rotate-90" : ""
                          }`}
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="#734ea4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                <SubcategoryDropdown
                  subcategories={category.subcategories || []}
                  isOpen={isDropdownOpen(category._id)}
                  onClose={handleDropdownClose}
                />
              </div>
            );
          })}
        </div>
        <hr className="md:mt-10 bg-[#D5D1DB]" />
      </div>
    );
  }
);

CategorySlider.displayName = "CategorySlider";
export default CategorySlider;

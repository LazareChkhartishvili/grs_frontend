"use client";

import { useCategories } from '../context/CategoryContext';
import Link from 'next/link';
import Image from 'next/image';
import { getValidImageUrl } from '../utils/imageUtils';

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-cinzel font-semibold text-gray-700">კატეგორიები იტვირთება...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">შეცდომა!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            თავიდან ცდა
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              კატეგორიები
            </h1>
            <p className="text-xl text-gray-600 font-merriweather max-w-2xl mx-auto">
              აირჩიეთ თქვენთვის საინტერესო კატეგორია და გაეცანით ჩვენს სერვისებს
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                {/* Category Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getValidImageUrl(category.backgroundImage)}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/images/blog.png';
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Icon */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                    <Image
                      src={getValidImageUrl(category.categoryImage)}
                      alt={`${category.title} icon`}
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/images/services/category.png';
                      }}
                    />
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-cinzel font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  {/* Subcategories Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-merriweather">
                      {category.items.length} სუბ კატეგორია
                    </span>
                    
                    {/* Arrow Icon */}
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  </div>

                  {/* Preview of first few subcategories */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {category.items.slice(0, 3).map((item, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-medium"
                        >
                          {item}
                        </span>
                      ))}
                      {category.items.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{category.items.length - 3} სხვა
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📂</div>
            <h3 className="text-2xl font-cinzel font-bold text-gray-600 mb-4">
              კატეგორიები არ მოიძებნა
            </h3>
            <p className="text-gray-500 font-merriweather">
              მოგვიანებით დაბრუნდით, ახალი კატეგორიები დაემატება
            </p>
          </div>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="text-center pb-12">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-cinzel font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          მთავარ გვერდზე დაბრუნება
        </Link>
      </div>
    </div>
  );
} 
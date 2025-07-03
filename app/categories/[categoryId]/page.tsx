"use client";

// import React, { useEffect, useState } from 'react';
// import { useCategories } from '../../hooks/useCategories';
// import { CategoryItem } from '../../context/CategoryContext';
// import Link from 'next/link';

// interface SubcategoryPageProps {
//   params: Promise<{
//     categoryId: string;
//   }>;
// }

// export default function SubcategoryPage({ params }: SubcategoryPageProps) {
//   const resolvedParams = React.use(params);
//   const { categories, loading, error } = useCategories();
//   const [category, setCategory] = useState<CategoryItem | null>(null);

//   const categoryId = resolvedParams?.categoryId;
//   const categoryIdNum = categoryId ? parseInt(categoryId) : NaN;

//   useEffect(() => {
//     if (!loading && categories.length > 0 && categoryId) {
//       const foundCategory = categories.find(cat => cat.id === categoryIdNum);

//       if (foundCategory) {
//         setCategory(foundCategory);
//       } else {
//         setCategory(null);
//       }
//     }
//   }, [categories, loading, categoryIdNum, categoryId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
//           <h2 className="text-2xl font-cinzel font-semibold text-gray-700">იტვირთება...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">შეცდომა!</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Link
//             href="/categories"
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             კატეგორიებზე დაბრუნება
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!category) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
//         <div className="text-center max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
//           <div className="text-yellow-500 text-6xl mb-4">🐛</div>
//           <h2 className="text-2xl font-cinzel font-bold text-yellow-600 mb-4">Debug Info</h2>
//           <div className="text-left bg-gray-100 p-4 rounded-lg mb-4">
//             <p><strong>URL CategoryId:</strong> {categoryId} (string)</p>
//             <p><strong>Parsed CategoryId:</strong> {categoryIdNum} (number)</p>
//             <p><strong>Available Categories:</strong></p>
//             <pre className="text-sm mt-2">
//               {JSON.stringify(categories.map(cat => ({ id: cat.id, title: cat.title })), null, 2)}
//             </pre>
//           </div>
//           <div className="flex gap-4 justify-center">
//             <Link
//               href="/categories"
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//             >
//               ყველა კატეგორია
//             </Link>
//             <Link
//               href="/categories/1"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//             >
//               კატეგორია #1-ზე გადასვლა
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       {/* Breadcrumb & Header */}
//       <div className="bg-white shadow-lg">
//         <div className="container mx-auto px-4 py-4">
//           {/* Breadcrumb */}
//           <nav className="text-sm text-gray-500 mb-4">
//             <Link href="/" className="hover:text-purple-600 transition-colors">მთავარი</Link>
//             <span className="mx-2">›</span>
//             <Link href="/categories" className="hover:text-purple-600 transition-colors">კატეგორიები</Link>
//             <span className="mx-2">›</span>
//             <span className="text-gray-700 font-medium">{category.title}</span>
//           </nav>

//           {/* Header */}
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
//               {category.title}
//             </h1>
//             <p className="text-lg text-gray-600 font-merriweather">
//               აირჩიეთ თქვენთვის საინტერესო სუბ კატეგორია
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Subcategories Grid */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="mb-8">
//           <h2 className="text-2xl font-cinzel font-bold text-gray-800 mb-2">
//             სუბ კატეგორიები ({category.items.length})
//           </h2>
//           <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {category.items.map((subcategory: string, index: number) => (
//             <div
//               key={index}
//               className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//             >
//               {/* Icon Section */}
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
//                   {/* Different icons for different subcategories */}
//                   {index % 4 === 0 && (
//                     <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   )}
//                   {index % 4 === 1 && (
//                     <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   )}
//                   {index % 4 === 2 && (
//                     <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                     </svg>
//                   )}
//                   {index % 4 === 3 && (
//                     <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                     </svg>
//                   )}
//                 </div>

//                 {/* Subcategory Title */}
//                 <h3 className="text-lg font-cinzel font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
//                   {subcategory}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-sm text-gray-500 font-merriweather mb-4">
//                   გაეცანით {subcategory.toLowerCase()}-ის სერვისებს და მიიღეთ დახმარება
//                 </p>

//                 {/* Action Button */}
//                 <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform group-hover:scale-105">
//                   ვრცლად ნახვა
//                 </button>
//               </div>

//               {/* Stats Section */}
//               <div className="px-6 pb-6">
//                 <div className="border-t border-gray-100 pt-4">
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>სერვისები: {Math.floor(Math.random() * 20) + 5}</span>
//                     <span>ექიმები: {Math.floor(Math.random() * 10) + 3}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {category.items.length === 0 && (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-6">📋</div>
//             <h3 className="text-2xl font-cinzel font-bold text-gray-600 mb-4">
//               სუბ კატეგორიები არ მოიძებნა
//             </h3>
//             <p className="text-gray-500 font-merriweather">
//               ამ კატეგორიაში ჯერ არ დაემატა სუბ კატეგორიები
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-center gap-4 pb-12">
//         <Link
//           href="/categories"
//           className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-cinzel font-semibold transition-all duration-300"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           ყველა კატეგორია
//         </Link>

//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-cinzel font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//           </svg>
//           მთავარი გვერდი
//         </Link>
//       </div>
//     </div>
//   );
// }

import React from "react";

import MobileNavbar from "../../components/Navbar/MobileNavbar";
import Header from "../../components/Header";
import Works from "../../components/Works";
import Subscribe from "../../components/Subscribe";
import ReviewSlider from "../../components/ReviewSlider";
import Blog from "../../components/Blog";
import Professional from "../../components/Professional";

import { useComplexes } from "@/app/hooks/useComplexes";

const Section = () => {
  const complexes = useComplexes();
  console.log(complexes);
  return (
    <div>
      <MobileNavbar />
      <Header />
      <Works title="Упражнения" />
      <Works title="Complexes" />
      <Subscribe />
      <ReviewSlider />
      <Blog withBanner={false} withSlider={false} />
      <Professional />
    </div>
  );
};

export default Section;

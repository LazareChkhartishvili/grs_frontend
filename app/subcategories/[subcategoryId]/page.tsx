"use client";

import { useParams } from 'next/navigation';

export default function SubcategoryPage() {
  const params = useParams();
  const subcategoryId = params.subcategoryId;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold bg-gradient-to-r from-[#734ea4] to-[#3f1a70] bg-clip-text text-transparent mb-4">
          ქვეკატეგორია
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          ქვეკატეგორია ID: {subcategoryId}
        </p>
        <div className="bg-white rounded-[20px] shadow-lg p-8 max-w-2xl mx-auto">
          <p className="text-gray-700">
            ამ ქვეკატეგორიის კონტენტი მალე ჩაიტვირთება...
          </p>
        </div>
      </div>
    </div>
  );
} 
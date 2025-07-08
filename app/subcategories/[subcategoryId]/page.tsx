"use client";

import React from "react";
import { useParams } from "next/navigation";

const SubcategoryPage = () => {
  const params = useParams();
  const subcategoryId = params.subcategoryId as string;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ქვეკატეგორიის სეტები</h1>
      <div className="text-center py-10">
        <p className="text-gray-500">სეტები ჩაიტვირთება full architecture-დან</p>
        <p className="text-sm text-gray-400 mt-2">Subcategory ID: {subcategoryId}</p>
      </div>
    </div>
  );
};

export default SubcategoryPage; 
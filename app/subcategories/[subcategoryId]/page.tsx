"use client";

import React from "react";
import { useParams } from "next/navigation";
import SetList from "../../components/SetList";

const SubcategoryPage = () => {
  const params = useParams();
  const subcategoryId = params.subcategoryId as string;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ქვეკატეგორიის სეტები</h1>
      <SetList subcategoryId={subcategoryId} />
    </div>
  );
};

export default SubcategoryPage; 
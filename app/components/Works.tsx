"use client";

import React from "react";
import WorksSlider from "./WorksSlider";
import Link from "next/link";
import { useComplexes } from "../hooks/useComplexes";

const Works = () => {
  const { complexes, loading, error } = useComplexes();

  // Transform complexes to work with existing WorksSlider component
  const works = complexes.flatMap(complex => 
    complex.exercises.map(exercise => ({
      id: exercise.id,
      title: exercise.category || exercise.title,
      description: exercise.description || `${exercise.difficulty} - ${exercise.duration} წუთი, ${exercise.sets} სეტი`,
      price: `${complex.price} ${complex.currency}`,
      image: exercise.image || "/assets/images/workMan.png",
    }))
  );

  if (loading) {
    return (
      <div className="bg-[#F9F7FE] md:px-10 md:mx-10 md:mt-0 px-4 md:my-10 rounded-b-[15px] md:pb-10">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9F7FE] md:px-10 md:mx-10 md:mt-0 px-4 md:my-10 rounded-b-[15px] md:pb-10">
        <div className="text-center py-10">
          <p className="text-red-500 mb-2">შეცდომა სავარჯიშოების ჩატვირთვაში</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7FE] md:px-10 md:mx-10 md:mt-0 px-4 md:my-10 rounded-b-[15px] md:pb-10">
      {/* Slider */}
      <WorksSlider title="Упражнения" works={works} />
      <Link
        href="complex"
        className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        Все {works.length} Упражнения →
      </Link>
    </div>
  );
};

export default Works;

"use client";

import React from "react";
import WorksSlider from "./WorksSlider";
import Link from "next/link";
import { useComplexes } from "../hooks/useComplexes";

const Works = ({ title }: { title: string }) => {
  const { complexes, loading, error } = useComplexes();

  console.log("🔍 Works component - complexes:", complexes);
  console.log("🔍 Works component - loading:", loading);
  console.log("🔍 Works component - error:", error);

  // Transform complexes to work with existing WorksSlider component
  const works = complexes.flatMap((complex) =>
    complex.exercises.map((exercise) => ({
      id: exercise.id,
      title: exercise.category || exercise.title,
      description:
        exercise.description ||
        `${exercise.difficulty} - ${exercise.duration} წუთი, ${exercise.sets} სეტი`,
      price: `${complex.price} ${complex.currency}`,
      image: exercise.image || "/assets/images/workMan.png",
    }))
  );

  if (loading) {
    return (
      <div className="bg-[#F9F7FE] md:px-5 md:mt-0 px-4 md:my-10 rounded-b-[15px] md:pb-10">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9F7FE] md:px-5 md:mx-10 md:mt-0 px-4 md:my-10 rounded-b-[15px] md:pb-10">
        <div className="text-center py-10">
          <p className="text-red-500 mb-2">შეცდომა სავარჯიშოების ჩატვირთვაში</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7FE] md:mt-0 mt-10 md:mb-10 mb-0 md:mx-5 rounded-b-[15px] md:pb-10 pb-0">
      {/* Slider */}
      <WorksSlider title={title} works={works} />
      <Link
        href="complex"
        className="text-[14px] md:px-10  px-5 md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        Все {works.length} Упражнения →
      </Link>
    </div>
  );
};

export default Works;

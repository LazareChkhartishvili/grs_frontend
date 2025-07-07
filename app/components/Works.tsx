"use client";

import React from "react";
import Link from "next/link";
import WorksSlider from "./WorksSlider";

interface Exercise {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  videoId?: string;
  video?: {
    url: string;
    duration: number;
  };
}

interface Set {
  _id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  categoryId: string;
  subcategoryId?: string;
  categoryName?: string;
  monthlyPrice: number;
}

interface WorksProps {
  title: string;
  items: Set[];
}

const Works: React.FC<WorksProps> = ({ title, items = [] }) => {
  // Transform sets to work with existing WorksSlider component
  const works = items.map((set) => ({
    id: set._id,
    title: set.title,
    description: set.description,
    image: "/assets/images/workMan.png", // Default image
    exerciseCount: set.exercises.length,
    categoryName: set.categoryName || "ორთოპედია", // დროებით ჩავსვათ დეფოლტი
    monthlyPrice: set.monthlyPrice || 920 // დეფოლტ ფასი
  }));

  return (
    <div className="bg-[#F9F7FE] md:mt-0 mt-10 md:mb-10 mb-0 md:mx-5 rounded-b-[15px] md:pb-10 pb-0">
      {/* Slider */}
      <WorksSlider title={title} works={works} />
      <Link
        href="sets"
        className="text-[14px] md:px-10 px-5 md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        ყველა {works.length} სეტი →
      </Link>
    </div>
  );
};

export default Works;

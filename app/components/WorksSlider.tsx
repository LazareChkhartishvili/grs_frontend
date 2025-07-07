"use client";

import Image from "next/image";
import React from "react";
import SliderArrows from "./SliderArrows";
import Link from "next/link";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  exerciseCount: number;
  categoryName: string;
  monthlyPrice: number;
}

interface WorksSliderProps {
  title?: string;
  works: WorkItem[];
}

const WorksSlider: React.FC<WorksSliderProps> = ({
  title = "სეტები",
  works,
}) => {
  const scroll = (direction: "left" | "right") => {
    const slider = document.getElementById("works-slider");
    if (slider) {
      slider.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mx-2 md:px-10 px-2 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] md:text-[40px] text-[#3D334A] mb-2.5 md:mb-5">
          {title}
        </h2>
        <SliderArrows
          onScrollLeft={() => scroll("left")}
          onScrollRight={() => scroll("right")}
        />
      </div>

      <div
        id="works-slider"
        className="overflow-x-auto scrollbar-hide mb-10 md:overflow-hidden"
      >
        <div className="flex gap-4">
          {works.map((work) => (
            <Link
              key={work.id}
              href={`/sets/${work.id}`}
              className="bg-white p-5 w-[335px] h-[493px] flex-shrink-0 rounded-[20px] hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex-grow">
                <Image
                  src={work.image}
                  width={319}
                  height={212}
                  alt={work.title}
                  className="w-full h-[212px] object-cover rounded mb-6"
                />
                <div className="mb-2.5">
                  <span className="px-2 py-1 bg-[#D4BAFC] rounded-[6px] text-white text-[14px] leading-[90%] uppercase">
                    {work.categoryName}
                  </span>
                </div>
                <p className="line-clamp-4 text-[#3D334A] leading-[120%] text-[24px] font-bold mb-4">
                  {work.description}
                </p>
              </div>
              <div className="flex items-center justify-end">
                <span className="p-2 bg-[#E9DFF6] rounded-[6px] text-[#3D334A] text-[18px] leading-[100%] font-bold">
                  {work.monthlyPrice}₾/თვე
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSlider;

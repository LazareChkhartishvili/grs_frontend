"use client";

import Image from "next/image";
import React from "react";
import SliderArrows from "./SliderArrows";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface WorksSliderProps {
  title?: string;
  works: WorkItem[];
}

const WorksSlider: React.FC<WorksSliderProps> = ({
  title = "Упражнения",
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
            <div
              key={work.id}
              className="bg-white p-5 w-[335px] h-[493px] flex-shrink-0 rounded-[20px]"
            >
              <Image
                src={work.image}
                width={319}
                height={212}
                alt="work"
                className="w-full h-[212px] object-cover rounded mb-6"
              />
              <h2 className="p-2 bg-[#E9DFF6] rounded-[6px] text-[#3D334A] text-[18px] leading-[90%] uppercase mb-2.5">
                {work.title}
              </h2>
              <p className="max-w-[295px] my-2.5 font-bold mb-10 text-[#3D334A] leading-[100%] text-[24px]">
                {work.description}
              </p>
              <div className="w-full flex items-end justify-end mt-2.5">
                <button className="p-2 mt-5 bg-[#D4BAFC] rounded-[6px] text-white text-[18px] leading-[100%] font-bold uppercase">
                  {work.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSlider;

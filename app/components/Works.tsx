import React from "react";
import SliderArrows from "./SliderArrows";
import WorksSlider from "./WorksSlider";
import Link from "next/link";

const Works = () => {
  return (
    <div className="bg-[#F9F7FE] md:px-10  md:mt-0 px-4 py-[50px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          Упражнения
        </h2>
        <SliderArrows />
      </div>
      {/* Slider */}
      <WorksSlider />
      <Link
        href=""
        className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        Все 5304 Упражнения →
      </Link>
    </div>
  );
};

export default Works;

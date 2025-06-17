import Link from "next/link";
import React from "react";
import CategorySlider from "./CategorySlider";
import SliderArrows from "./SliderArrows";

const Category = () => {
  return (
    <div className="bg-[#F9F7FE] md:mx-10 md:px-10 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          Категории
        </h1>
        <SliderArrows />
      </div>
      <Link
        href="/categories"
        className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC] hover:text-[#734ea4] transition-colors duration-300"
      >
        Смотреть все →
      </Link>

      <CategorySlider />
    </div>
  );
};

export default Category;

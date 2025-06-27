"use client";

import Link from "next/link";
import React, { useRef } from "react";
import CategorySlider from "./CategorySlider";
import SliderArrows from "./SliderArrows";

const Category = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F9F7FE] md:mx-5 md:px-5 px-4 md:pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] md:text-[40px] text-[#3D334A] mb-2.5 md:mb-5">
          Категории
        </h1>
        <SliderArrows onScrollLeft={scrollLeft} onScrollRight={scrollRight} />
      </div>

      <Link
        href="/categories"
        className="text-[14px] md:text-[24px] uppercase text-[#D4BAFC] hover:text-[#734ea4] transition-colors duration-300"
      >
        Смотреть все →
      </Link>

      <CategorySlider ref={sliderRef} />
    </div>
  );
};

export default Category;

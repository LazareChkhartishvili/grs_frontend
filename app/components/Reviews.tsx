import React from "react";
import SliderArrows from "./SliderArrows";
import ReviewSlider from "./ReviewSlider";

const Reviews = () => {
  return (
    <div className="md:mx-10 md:mb-10 mb-10">
      <div className="flex items-center justify-between py-5 px-6 md:py-[50px] md:px-15">
        <h1 className="text-[20px] leadig-[120%] text-[#3D334A] md:text-[40px] md:tracking-[-3%]">
          ОТЗЫВЫ О GRS
        </h1>
        <SliderArrows />
      </div>
      <ReviewSlider />
    </div>
  );
};

export default Reviews;

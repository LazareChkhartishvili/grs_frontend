import React from "react";
import Banner from "./Banner";
import SliderArrows from "./SliderArrows";
import BlogSlider from "./BlogSlider";

const Blog = () => {
  return (
    <div className="bg-[#F9F7FE] md:mx-10 md:mb-10">
      <div>
        <Banner
          backgroundUrl="/assets/images/blog.png"
          logoUrl="/assets/images/simpleLogo.svg"
        />
      </div>
      <div className="py-5 px-6 md:py-[50px] md:px-15">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] leadig-[120%] text-[#3D334A] md:text-[40px] md:tracking-[-3%]">
            Блог
          </h2>
          <SliderArrows />
        </div>
        {/* Slider */}
        <BlogSlider />
      </div>
    </div>
  );
};

export default Blog;

"use client";
import React, { useRef, useState, useMemo } from "react";
import Banner from "./Banner";
import SliderArrows from "./SliderArrows";
import BlogSlider from "./BlogSlider";
import { blogItem } from "./BlogItems";

const Blog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 6;
  const totalPages = useMemo(() => {
    const otherBlogs = blogItem.slice(1);
    return Math.ceil(otherBlogs.length / blogsPerPage);
  }, []);

  const scrollLeft = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const canScrollLeft = currentPage > 0;
  const canScrollRight = currentPage < totalPages - 1;

  return (
    <div className="bg-[#F9F7FE] md:mx-10 md:mb-10">
      <Banner
        backgroundUrl="/assets/images/blog.png"
        logoUrl="/assets/images/simpleLogo.svg"
        icon="/assets/images/media.png"
        iconHeight={33}
        iconWidth={125}
      />
      <div className="py-5 px-6 md:py-[50px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] leading-[120%] text-[#3D334A] md:text-[40px] md:tracking-[-3%]">
            Блог
          </h2>
          <SliderArrows
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
          />
        </div>
        <BlogSlider
          scrollRef={scrollRef}
          currentPage={currentPage}
          blogsPerPage={blogsPerPage}
        />
      </div>
    </div>
  );
};

export default Blog;

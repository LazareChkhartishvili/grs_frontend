"use client";
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import BlogSlider from "../components/BlogSlider";
import SliderArrows from "../components/SliderArrows";

const Blog = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  return (
    <div>
      <Header />
      <div className="mt-40 flex flex-col gap-20">
      <SliderArrows
  onScrollLeft={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  onScrollRight={() => setCurrentPage((prev) => prev + 1)}
/>
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

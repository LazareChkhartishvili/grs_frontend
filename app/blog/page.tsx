import React from "react";
import Header from "../components/Header";
import BlogSlider from "../components/BlogSlider";

const Blog = () => {
  return (
    <div>
      <Header />
      <div className="mt-40 flex flex-col gap-20">
        <BlogSlider />
        <BlogSlider />
        <BlogSlider />
        <BlogSlider />
      </div>
    </div>
  );
};

export default Blog;

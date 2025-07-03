// GridLayouts.tsx
"use client";
import React from "react";
import BlogSlider from "./BlogSlider";
import OtherGrid from "./OtherGrid";
import ThirdGrid from "./ThirdGrid";

export type LayoutType = "default" | "other" | "thirdGrid";

interface GridLayoutsProps {
  layoutType: LayoutType;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  currentPage: number;
  blogsPerPage: number;
}

const GridLayouts: React.FC<GridLayoutsProps> = ({
  layoutType,
  scrollRef,
  currentPage,
  blogsPerPage,
}) => {
  switch (layoutType) {
    case "default":
      return (
        <BlogSlider
          scrollRef={scrollRef}
          currentPage={currentPage}
          blogsPerPage={blogsPerPage}
        />
      );
    case "other":
      return (
        <OtherGrid
          scrollRef={scrollRef}
          currentPage={currentPage}
          blogsPerPage={blogsPerPage}
        />
      );
    case "thirdGrid":
      return (
        <ThirdGrid
          scrollRef={scrollRef}
          currentPage={currentPage}
          blogsPerPage={blogsPerPage}
        />
      );
    default:
      return null;
  }
};

export default GridLayouts;

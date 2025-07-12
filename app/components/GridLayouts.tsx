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
  // Mobile horizontal scroll wrapper
  return (
    <div className="sm:block flex sm:flex-col flex-row overflow-x-auto gap-4 p-2 sm:overflow-visible sm:gap-0">
      {/* Render the selected layout inside the scrollable row for mobile */}
      {(() => {
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
      })()}
    </div>
  );
};

export default GridLayouts;

"use client";
import React, { useRef, useState, useMemo } from "react";
import Banner from "./Banner";
import SliderArrows from "./SliderArrows";
import GridLayouts, { LayoutType } from "./GridLayouts";
import { blogItem } from "./BlogItems";
// import { useI18n } from "../context/I18nContext";

interface BlogProps {
  withBanner: boolean;
  withSlider: boolean;
  layoutType?: LayoutType;
  title: string;
}

const Blog: React.FC<BlogProps> = ({
  withBanner,
  withSlider,
  layoutType = "default",
  title = "Blog",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const blogsPerPage = 4;
  // const { t } = useI18n();

  const totalPages = useMemo(() => {
    const otherBlogs = blogItem.slice(1);
    return Math.ceil(otherBlogs.length / blogsPerPage);
  }, [blogsPerPage]);

  const scrollLeft = (): void => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (): void => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const canScrollLeft = currentPage > 0;
  const canScrollRight = currentPage < totalPages - 1;

  return (
    <div className="bg-[#F9F7FE] md:pb-10 md:mx-5 md:rounded-[20px]">
      {withBanner && (
        <Banner
          backgroundUrl="/assets/images/blog.png"
          logoUrl="/assets/images/simpleLogo.svg"
          icon="/assets/images/media.png"
          iconHeight={33}
          iconWidth={125}
        />
      )}

      <div className="py-5 md:px-6">
        {withSlider && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] leading-[120%] text-[#3D334A] md:text-[40px] md:tracking-[-3%]">
              {title}
            </h2>
            <SliderArrows
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
            />
          </div>
        )}

        <GridLayouts
          layoutType={layoutType}
          scrollRef={scrollRef}
          currentPage={currentPage}
          blogsPerPage={blogsPerPage}
        />
      </div>
    </div>
  );
};

export default Blog;

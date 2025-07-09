// BlogSlider.tsx
"use client";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { blogItem } from "./BlogItems";
import Link from "next/link";

interface BlogSliderProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  currentPage: number;
  blogsPerPage: number;
}

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
};

const BlogSlider: React.FC<BlogSliderProps> = ({
  scrollRef,
  currentPage,
  blogsPerPage,
}) => {
  const isDesktop = useIsDesktop();
  const featuredBlog = blogItem[0];
  const otherBlogs = blogItem.slice(1);

  const getCurrentBlogs = () => {
    const startIndex = currentPage * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return otherBlogs.slice(startIndex, endIndex);
  };

  return (
    <div className="md:mt-[50px] mt-5 w-full font-[Pt]">
      <div className="flex md:flex-row flex-col gap-2.5 mb-10 w-full px-0">
        {/* Featured Blog */}
        {featuredBlog && isDesktop && (
          <Link href={"/article"}>
            <div className="bg-white md:p-2 md:pb-5 md:h-[518px] w-[280px] md:w-auto flex-shrink-0 rounded-[20px] flex-col justify-between snap-center hidden :flex">
              <div className="relative min-w-[300px] max-w-[690px]">
                <Image
                  src={featuredBlog.imageUrl}
                  width={694}
                  height={232}
                  alt="featuredBlogImage"
                  className=" md:h-[232px] object-cover rounded-t-[20px]"
                />
                <p className="text-[#3D334A] tracking-[0%] md:mt-[29px] mt-3 md:mb-5 mb-2 text-[16px] md:text-[32px] leading-[120%] font-semibold px-3">
                  {featuredBlog.description}
                </p>
                <p className="mt-5 text-[#846FA0] font-medium leading-[120%] tracking-[0%] px-5">
                  {featuredBlog.subText}
                </p>
                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 font-[Bowler] mt-4">
                <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                  {featuredBlog.category}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Desktop Grid */}
        {isDesktop ? (
          <div className="relative">
            <div className="grid grid-cols-2 grid-rows-2 gap-5 ">
              {getCurrentBlogs().map((item) => (
                <Link key={item.id} href={"/article"}>
                  <div
                    key={item.id}
                    className="min-w-[200px] max-w-full md:h-[249px] p-5 bg-white flex flex-col justify-between rounded-[20px]"
                  >
                    <p className="text-[#3D334A] text-[18px] leading-[120%] line-clamp-2 font-bold md:text-[24px]">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                          <CiBookmark className="w-[14.2px] h-[18.68px] text-black" />
                        </div>
                        <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                          <IoIosShareAlt className="w-[14.2px] h-[18.68px] text-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex lg:hidden overflow-auto gap-5 flex-row overflow-x-auto snap-x snap-mandatory"
          >
            {otherBlogs.map((item) => (
              <Link key={item.id} href={"/article"}>
                <div className="w-[200px] flex-shrink-0 p-3 bg-white flex flex-col justify-between rounded-[10px] snap-center">
                  <Image
                    src={item.imageUrl}
                    width={189}
                    height={172}
                    alt="blog"
                    className="flex"
                  />
                  <p className="text-[#3D334A] text-[14px] leading-[120%] mt-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                        <CiBookmark className="text-black" />
                      </div>
                      <div className="w-8 h-8 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                        <IoIosShareAlt className="text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <span className="text-[#D4BAFC] leading-[90%] text-[15px] md:text-[24px] md:px-5 px-0 cursor-pointer">
        Все 439 статей →
      </span>
    </div>
  );
};

export default BlogSlider;

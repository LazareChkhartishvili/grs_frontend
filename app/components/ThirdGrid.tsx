"use client";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import React from "react";
import { blogItem } from "./BlogItems";
import Link from "next/link";

interface ThirdGridProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  currentPage: number;
  blogsPerPage: number;
}

const ThirdGrid: React.FC<ThirdGridProps> = ({}) => {
  // 7 ელემენტი
  const otherBlogs = blogItem.slice(1, 8);

  if (otherBlogs.length < 7) {
    return <div>ბლოგების რაოდენობა საკმარისი არ არის</div>;
  }

  // სწორი თანმიმდევრობა: [1, 2, 3, 4, 5, 7, 8]
  const orderedBlogs = [
    otherBlogs[0], // 1
    otherBlogs[1], // 2
    otherBlogs[2], // 3
    otherBlogs[3], // 4
    otherBlogs[4], // 5
    otherBlogs[5], // 7
    otherBlogs[6], // 8
  ];

  return (
    <div>
      <h1 className="px-5 text-[#3D334A] text-[40px] leading-[120%] tracking-[-3%] mb-2">
        Ортопедия
      </h1>
      <span className="text-[#D4BAFC] px-5 text-[24px] leading-[90%] uppercase mt-2">
        Смотреть все →
      </span>
      {/* Desktop: grid, Mobile: horizontal scrollable flex */}
      <div
        className="
          hidden
          sm:grid
          grid-cols-4 grid-rows-4 gap-4 p-2
        "
      >
        <div className="col-span-2 row-span-2">
          {/* 1 */}
          {orderedBlogs[0] && (
            <Link href="/article">
              <div className="h-[249px] flex flex-col justify-between bg-white rounded-[20px] p-2">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-1 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[0].description}
                </p>
                <p className="mt-0 text-[#846FA0] font-[Pt] font-medium leading-[120%] tracking-[0%] px-3">
                  {orderedBlogs[0].subText}
                </p>
                <div className="px-3 pb-3 font-[Bowler] mt-2">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[0].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-2 col-start-1 row-start-3">
          {/* 2 */}
          {orderedBlogs[1] && (
            <Link href="/article">
              <div className="h-[249px] flex flex-col justify-between bg-white rounded-[20px] p-2">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[1].description}
                </p>
                <div className="px-3 pb-3 font-[Bowler] mt-1">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[1].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-2 col-start-2 row-start-3">
          {/* 3 */}
          {orderedBlogs[2] && (
            <Link href="/article">
              <div className="h-[249px] flex flex-col justify-between bg-white rounded-[20px] p-2">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[2].description}
                </p>
                <div className="px-3 pb-3 font-[Bowler] mt-1">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[2].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-2 col-start-3 row-start-1">
          {/* 4 */}
          {orderedBlogs[3] && (
            <Link href="/article">
              <div className="h-[249px] flex flex-col justify-between bg-white rounded-[20px] p-2">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[3].description}
                </p>
                <div className="px-3 pb-3 font-[Bowler] mt-1">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[3].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-4 col-start-4 row-start-1">
          {/* 5 */}
          {orderedBlogs[4] && (
            <Link href="/article">
              <div className="h-full flex flex-col justify-between bg-white rounded-[20px] p-2 min-h-[100%]">
                <Image
                  src={orderedBlogs[1].imageUrl}
                  width={319}
                  height={247}
                  alt="featuredBlogImage"
                  className="rounded-[12px] object-cover w-full h-[247px] mb-3"
                />
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[4].description}
                </p>
                <p className="mt-0 text-[#846FA0] font-medium font-[Pt] leading-[120%] tracking-[0%] px-3">
                  {orderedBlogs[1].subText}
                </p>
                <div className="px-3 pb-3 font-[Bowler] mt-1">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[4].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-2 row-start-3">
          {/* 6 */}
          {orderedBlogs[5] && (
            <Link href="/article">
              <div className="h-[249px] flex flex-col justify-between bg-white rounded-[20px] p-2">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[5].description}
                </p>
                <div className="px-3 pb-3 font-[Bowler] mt-1">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[5].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile: horizontal scroll */}
      <div className="flex sm:hidden gap-4 overflow-x-auto p-2">
        {orderedBlogs.map((blog) => (
          <div
            className="min-w-[260px] max-w-[260px] flex-shrink-0 p-5 bg-white flex flex-col justify-between rounded-[20px]"
            key={blog.id}
          >
            <Image
              src={blog.imageUrl}
              alt={blog.description}
              width={300}
              height={160}
              className="rounded-md object-cover w-full h-[120px] mb-3"
            />
            <p className="text-[#3D334A] text-[18px] leading-[120%] line-clamp-2 font-bold">
              {blog.description}
            </p>
            <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase mt-2 inline-block">
              {blog.category}
            </span>
            <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase mt-2 inline-block">
              {blog.subText}
            </span>
            <div className="flex items-center gap-1.5 mt-3">
              <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                <CiBookmark className="w-[14.2px] h-[18.68px] text-black" />
              </div>
              <div className="w-10 h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                <IoIosShareAlt className="w-[14.2px] h-[18.68px] text-black" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdGrid;

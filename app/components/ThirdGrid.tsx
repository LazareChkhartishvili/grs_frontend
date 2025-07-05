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

  // ახალი grid კლასები შენი layout-ის მიხედვით
  const gridClasses = [
    "col-span-2 row-span-2", // 1
    "row-span-2 col-start-3", // 2
    "row-span-2 col-start-4", // 3
    "row-span-2 row-start-3", // 4
    "row-span-2 row-start-3", // 5
    "row-span-2 row-start-3", // 7
    "row-span-2 row-start-3", // 8
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
        {orderedBlogs.map((blog, idx) => (
          <Link key={blog.id} href="/article">
            <div
              className={`min-w-[200px] max-w-full p-5 bg-white flex flex-col justify-between rounded-[20px] ${gridClasses[idx]}`}
            >
              <Image
                src={blog.imageUrl}
                alt={blog.description}
                width={300}
                height={160}
                className="rounded-md object-cover w-full h-[120px] mb-3"
              />
              <p className="text-[#3D334A] text-[18px] leading-[120%] line-clamp-2 font-bold md:text-[24px]">
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
          </Link>
        ))}
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

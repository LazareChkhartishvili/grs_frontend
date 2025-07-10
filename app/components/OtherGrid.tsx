"use client";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import React from "react";
import { blogItem } from "./BlogItems";
import Link from "next/link";
import { FaShare } from "react-icons/fa6";

interface OtherGridProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  currentPage: number;
  blogsPerPage: number;
}

const OtherGrid: React.FC<OtherGridProps> = ({}) => {
  const otherBlogs = blogItem.slice(1, 6);

  if (otherBlogs.length < 5) {
    return <div>ბლოგების რაოდენობა საკმარისი არ არის</div>;
  }

  const orderedBlogs = [
    otherBlogs[0], // 1
    otherBlogs[1], // 2
    otherBlogs[2], // 3
    otherBlogs[3], // 4
    otherBlogs[4], // 5
  ];

  const gridClasses = [
    "row-span-5", // 1
    "row-span-5", // 2
    "col-span-2 row-span-3", // 3
    "row-span-2 col-start-3 row-start-4", // 4
    "row-span-2 col-start-4 row-start-4", // 5
  ];

  return (
    <div>
      <h1 className="px-5 text-[#3D334A] text-[40px] leading-[120%] tracking-[-3%] mb-2">
        Популярные статьи
      </h1>
      <span className="text-[#D4BAFC] px-5 text-[24px] leading-[90%] uppercase mt-2">
        Смотреть все →
      </span>
      <div className="grid grid-cols-4 grid-rows-5 gap-4 p-2 max-h-[518px]">
        <div className="row-span-5">
          {/* ბლოგი 1 */}
          {orderedBlogs[0] && (
            <Link href="/article">
              <div className="min-h-full h-full flex flex-col justify-between bg-white rounded-[20px] p-2">
                <Image
                  src={orderedBlogs[0].imageUrl}
                  width={319}
                  height={247}
                  alt="featuredBlogImage"
                  className="rounded-[12px] object-cover w-full h-[247px] mb-3"
                />
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-1 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[0].description}
                </p>
                <p className="mt-0 text-[#846FA0] font-[Pt] font-medium leading-[120%] tracking-[0%] px-3">
                  {orderedBlogs[0].subText}
                </p>
                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
                <div className="px-3 pb-3 font-[Bowler] mt-2">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[0].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-5">
          {/* ბლოგი 2 */}
          {orderedBlogs[1] && (
            <Link href="/article">
              <div className="min-h-full h-full flex flex-col justify-between bg-white rounded-[20px] p-2">
                <Image
                  src={orderedBlogs[1].imageUrl}
                  width={319}
                  height={247}
                  alt="featuredBlogImage"
                  className="rounded-[12px] object-cover w-full h-[247px] mb-3"
                />
                <p className="text-[#3D334A] tracking-[0%] font-[Pt] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[1].description}
                </p>
                <p className="mt-0 text-[#846FA0] font-medium font-[Pt] leading-[120%] tracking-[0%] px-3">
                  {orderedBlogs[1].subText}
                </p>
                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
                <div className="px-3 pb-3 font-[Bowler] mt-1">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[1].category}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="col-span-2 row-span-3">
          {/* ბლოგი 3 */}
          {orderedBlogs[2] && (
            <Link href="/article">
              <div className="min-h-full relative h-full flex flex-col justify-between bg-white rounded-[20px] p-5">
                <p className="text-[#3D334A] tracking-[0%] font-[Pt] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[2].description}
                </p>
                <p className="mt-0 text-[#846FA0] font-[Pt] font-medium leading-[120%] tracking-[0%] px-3">
                  {orderedBlogs[2].subText}
                </p>
                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
                <div className="px-3 pb-3 font-[Bowler] mt-4">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[2].category}
                  </span>
                </div>
                <div className="absolute flex items-center right-5 bottom-[25px] gap-2">
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <CiBookmark color="black" />
                  </div>
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <FaShare color="black" />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-2 col-start-3 row-start-4">
          {/* ბლოგი 4 */}
          {orderedBlogs[3] && (
            <Link href="/article">
              <div className="min-h-full relative h-full flex flex-col justify-between bg-white rounded-[20px] p-5">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[3].description}
                </p>

                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
                <div className="px-3 pb-3 font-[Bowler] mt-4">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[3].category}
                  </span>
                </div>
                <div className="absolute flex items-center right-5 bottom-[25px] gap-2">
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <CiBookmark color="black" />
                  </div>
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <FaShare color="black" />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="row-span-2 col-start-4 row-start-4">
          {/* ბლოგი 5 */}
          {orderedBlogs[4] && (
            <Link href="/article">
              <div className="min-h-full relative h-full flex flex-col justify-between bg-white rounded-[20px] p-5">
                <p className="text-[#3D334A] font-[Pt] tracking-[0%] mt-0 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                  {orderedBlogs[4].description}
                </p>

                <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                  </div>
                </div>
                <div className="px-3 pb-3 font-[Bowler] mt-4">
                  <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                    {orderedBlogs[4].category}
                  </span>
                </div>
                <div className="absolute flex items-center right-5 bottom-[25px] gap-2">
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <CiBookmark color="black" />
                  </div>
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <FaShare color="black" />
                  </div>
                </div>
                <div className="absolute flex items-center right-5 bottom-[25px] gap-2">
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <CiBookmark color="black" />
                  </div>
                  <div className="bg-[#F9F7FE] w-10 h-10 flex items-center justify-center rounded-md">
                    <FaShare color="black" />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile: horizontal scroll */}
      <div className="flex sm:hidden gap-4 overflow-x-auto p-2">
        {orderedBlogs.map((blog, idx) => (
          <Link key={blog.id} href="/article">
            <div
              className={`min-w-[200px] max-w-full p-5 bg-white flex flex-col justify-between rounded-[20px] ${gridClasses[idx]}`}
            >
              <Image
                src={blog.imageUrl}
                width={300}
                height={160}
                alt="featuredBlogImage"
                className="rounded-md object-cover w-full h-[120px] mb-3"
              />
              <p className="text-[#3D334A] tracking-[0%] md:mt-[10px] mt-0 md:mb-2 mb-2 text-[16px] md:text-[24px] leading-[120%] font-semibold px-3">
                {blog.description}
              </p>
              <p className="mt-0 text-[#846FA0] font-medium leading-[120%] tracking-[0%] px-3">
                {blog.subText}
              </p>
              <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                  <CiBookmark className="md:w-[14.2px] md:h-[18.68px] text-white" />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 rounded-[6px] flex justify-center items-center">
                  <IoIosShareAlt className="md:w-[14.2px] md:h-[18.68px]" />
                </div>
              </div>
              <div className="px-3 pb-3 font-[Bowler] mt-4">
                <span className="text-[#3D334A] font-[Bowler] p-1.5 leading-[90%] bg-[#E9DFF6] rounded-[6px] text-[14px] uppercase">
                  {blog.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherGrid;

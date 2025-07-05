"use client";

import React, { useState, useEffect } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import CourseSlider from "../components/CourseSlider";
import { CiSearch } from "react-icons/ci";
import { useCourses } from "../hooks/useCourses";
import { useCategories } from "../context/CategoryContext";
import { useRouter } from "next/navigation";

const AllCourse = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { categories, loading: categoriesLoading } = useCategories();
  const {
    courses,
    loading: coursesLoading,
    error,
  } = useCourses(selectedCategory || undefined);
  const router = useRouter();

  useEffect(() => {
    router.push("/allCourse/1");
  }, [router]);

  const loading = categoriesLoading || coursesLoading;

  if (loading) {
    return (
      <div className="bg-[#F9F7FE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            მონაცემები იტვირთება...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9F7FE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-4">
            შეცდომა კურსების ჩატვირთვაში
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7FE] pb-40">
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
      <MobileNavbar />
      <div className=" mx-2 px-4">
        <h1 className="text-[#3D334A] text-[40px] leading-[120%] tracking-[-3%] mb-[61px]">
          Курсы
        </h1>
        <div className="relative ">
          <input
            type="text"
            placeholder="Введите название упражнения"
            className=" w-full bg-white rounded-[54px] px-[50px] py-[21px] mb-10 text-[#846FA0] text-[19px] font-medium"
          />
          <CiSearch
            color="black"
            size={25}
            className="absolute top-[22px] left-4"
          />
          <div className="w-full min-h-[264px]  bg-white rounded-[40px] mb-10 p-10 flex flex-wrap flex-row gap-[10px]">
            {/* ყველა კატეგორია ღილაკი */}
            <button
              key="all"
              onClick={() => setSelectedCategory(null)}
              className={`text-[#3D334A] text-[19px] mx-auto md:mx-0 rounded-[8px] px-5 h-[33px] transition-colors ${
                selectedCategory === null ? "bg-[#D4BAFC]" : "bg-[#F9F7FE]"
              }`}
            >
              Все категории
            </button>

            {/* კატეგორიების ღილაკები */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-[#3D334A] text-[19px] mx-auto md:mx-0 rounded-[8px] px-5 h-[33px] transition-colors ${
                  selectedCategory === category.id
                    ? "bg-[#D4BAFC]"
                    : "bg-[#F9F7FE]"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="mb-10">
                <CourseSlider />
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">კურსები ვერ მოიძებნა</p>
            </div>
          )}
        </div>
        <button className="w-[512px] py-4 cursor-pointer rounded-[10px] text-[#3D334A] text-[32px] bg-[#D4BAFC] flex justify-center items-center mx-auto mt-10 ">
          Показать еще
        </button>
      </div>
    </div>
  );
};

export default AllCourse;

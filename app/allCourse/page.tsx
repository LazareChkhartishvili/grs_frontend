"use client";

import React, { useRef, useEffect, useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import CourseSlider from "../components/CourseSlider";
import { useCourses } from "../hooks/useCourses";
import { CiSearch } from "react-icons/ci";
// import { useRouter } from "next/navigation";

// --- Demo categories for visual ---
const demoCategories = [
  { id: "all", title: "Все категории", active: true },
  {
    id: "ortopedia",
    title: "ОРТОПЕДИЯ",
    dropdownItems: ["Подкатегория 1", "Подкатегория 2"],
  },
  {
    id: "ortopedia3",
    title: "ОРТОПЕДИЯ (3)",
    dropdownItems: ["Вариант 1", "Вариант 2", "Вариант 3"],
  },
  { id: "afaziya", title: "АФАЗИЯ И ДИЗАРТРИЯ" },
  { id: "ozhirenie", title: "ОЖИРЕНИЕ" },
  { id: "nevrologia", title: "НЕВРОЛОГИЯ" },
  { id: "covid", title: "РЕАБИЛИТАЦИЯ ПОСЛЕ COVID-19" },
  { id: "pohodka", title: "РЕАБИЛИТАЦИЯ ПОХОДКИ" },
  { id: "pozhilyh", title: "РЕАБИЛИТАЦИЯ ДЛЯ ПОЖИЛЫХ" },
];

const AllCourse = () => {
  // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // const { categories, loading: categoriesLoading } = useCategories();
  const { courses, loading: coursesLoading, error } = useCourses(undefined);
  // const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   router.push("/allCourse/1");
  // }, [router]);
  // useEffect(() => {
  //   router.push("/allCourse/1");
  // }, [router]);

  const loading = coursesLoading;

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
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Введите название упражнения"
            className="w-full bg-white rounded-[54px] px-[50px] py-[21px] mb-2 text-[#846FA0] text-[19px] font-medium"
          />
          <CiSearch
            color="black"
            size={25}
            className="absolute top-[22px] left-4"
          />
        </div>
        {/* --- Category bar as in screenshot --- */}
        <div
          ref={dropdownRef}
          className="w-full min-h-[64px] bg-white rounded-[40px] mb-6 p-4 flex flex-wrap gap-2 md:gap-3 items-center"
        >
          {demoCategories.map((cat, idx) => {
            const isDropdown = !!cat.dropdownItems;
            const isOpen = openDropdownId === cat.id;
            return (
              <div key={cat.id} className="relative">
                <button
                  className={`text-[#3D334A] text-[13px] md:text-[15px] font-medium rounded-[8px] px-3 md:px-5 h-[33px] transition-colors whitespace-nowrap flex items-center gap-1
                    ${idx === 0 ? "bg-[#E9DDFB] font-bold" : "bg-[#F9F7FE]"}
                    ${cat.active ? "shadow-sm" : ""}
                    ${isOpen ? "ring-2 ring-[#D4BAFC] bg-[#F3D57F]" : ""}
                  `}
                  onClick={() => {
                    if (isDropdown) {
                      setOpenDropdownId(isOpen ? null : cat.id);
                    }
                  }}
                  type="button"
                >
                  {cat.title}
                  {isDropdown && (
                    <span
                      className={`ml-1 text-xs transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </button>
                {/* Dropdown menu */}
                {isDropdown && isOpen && (
                  <div className="absolute left-0 top-full mt-1 z-20 bg-white rounded-[10px] shadow-lg min-w-[160px] py-2 animate-fade-in">
                    {cat.dropdownItems.map((item, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 hover:bg-[#F3D57F] cursor-pointer text-[#3D334A] text-[13px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
        <button className="w-[512px] py-4 cursor-poer rounded-[10px] text-[#3D334A] text-[32px] bg-[#D4BAFC] flex justify-center items-center mx-auto mt-10 ">
          Показать еще
        </button>
      </div>
    </div>
  );
};

export default AllCourse;

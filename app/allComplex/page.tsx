"use client";
import React, { useRef, useEffect, useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Category from "../components/Category";
import { CiSearch } from "react-icons/ci";
import Works from "../components/Works";

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

const AllComplex = () => {
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

  return (
    <div className="bg-[#F9F7FE]">
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
      <MobileNavbar />
      <h1 className="md:text-[64px] md:px-10 px-5 leading-[100%] tracking-[-3%] text-[#3D334A]">
        Все комплексы
      </h1>
      <Category />
      {/* Search input */}
      <div className="relative mb-6 max-w-full mx-10 mt-8">
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
        className="w-full px-10 min-h-[64px] bg-white rounded-[40px] mb-6 p-4 flex flex-wrap gap-2 md:gap-3 items-center"
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
                  {cat.dropdownItems.map((item: string, i: number) => (
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
      <Works title={"Популярные разделы"} />
      <Works title={"Популярные комплексы "} />
      <Works title={"Ортопедия"} />
      <Works title={""} />
      <Works title={""} />
    </div>
  );
};

export default AllComplex;

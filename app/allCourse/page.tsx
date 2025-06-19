import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import CourseSlider from "../components/CourseSlider";
import { CiSearch } from "react-icons/ci";

const courseChoose = [
  {
    id: 1,
    title: "Все категории",
    active: false,
  },
  {
    id: 2,
    title: "Все категории",
    active: false,
  },
  {
    id: 3,
    title: "Все категории",
    active: false,
  },
  {
    id: 4,
    title: "Все категории",
    active: false,
  },
  {
    id: 5,
    title: "Все категории",
    active: false,
  },
  {
    id: 6,
    title: "Все категории",
    active: false,
  },
  {
    id: 7,
    title: "Все категории",
    active: false,
  },

  {
    id: 8,
    title: "Все категории",
    active: false,
  },
  {
    id: 9,
    title: "Все категории",
    active: false,
  },
  {
    id: 10,
    title: "Все категории",
    active: false,
  },
];

const AllCourse = () => {
  return (
    <div className="bg-[#F9F7FE] pb-40">
      <DesktopNavbar menuItems={defaultMenuItems} />
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
            {courseChoose.map((courseItem) => {
              return (
                <h4
                  key={courseItem.id}
                  className="text-[#3D334A] text-[19px] mx-auto md:mx-0 bg-[#F9F7FE] rounded-[8px] px-5 h-[33px]"
                >
                  {courseItem.title}
                </h4>
              );
            })}
          </div>
        </div>
        <div>
          <CourseSlider />
          <CourseSlider />
          <CourseSlider />
        </div>
        <button className="w-[512px] py-4 cursor-pointer rounded-[10px] text-[#3D334A] text-[32px] bg-[#D4BAFC] flex justify-center items-center mx-auto mt-10 ">
          Показать еще
        </button>
      </div>
    </div>
  );
};

export default AllCourse;

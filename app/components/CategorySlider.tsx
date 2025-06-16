import Image from "next/image";
import React from "react";

const categories = [
  {
    id: 1,
    title: "Ортопедия",
    backgroundImage: "/assets/images/blog.png",
    categoryImage: "/assets/images/services/category.png",
  },
  {
    id: 2,
    title: "Терапия",
    backgroundImage: "/assets/images/blog.png",
    categoryImage: "/assets/images/services/course2.png",
  },
  {
    id: 3,
    title: "Хирургия",
    backgroundImage: "/assets/images/blog.png",
    categoryImage: "/assets/images/services/cousre1.png",
  },
];

const CategorySlider = () => {
  return (
    <div className="relative md:mt-10">
      <div className="flex items-center gap-[14px] md:gap-[26px] overflow-x-auto scrollbar-hide ">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 bg-cover bg-center rounded-[20px] w-[240px] h-[140px] md:w-[455px] md:h-[230px]"
            style={{ backgroundImage: `url(${category.backgroundImage})` }}
          >
            <Image
              src={category.categoryImage}
              width={232}
              height={82}
              alt={category.title}
              className="mx-auto rounded-[14px] p-[4px] md:w-[443px] md:h-[163px]"
            />
            <div className="flex items-center justify-between bg-white py-2 md:py-4 px-4 mx-[4px] rounded-[20px] text-black">
              <h4>{category.title}</h4>
              <Image
                src="/assets/images/dropDown.svg"
                width={6}
                height={3}
                alt="dropDown"
                className="bg-[#E9DFF6] w-4 h-4"
              />
            </div>
          </div>
        ))}
      </div>
      <hr className=" md:mt-10 bg-[#D5D1DB] text-[#D5D1DB]" />
      {/* <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent hidden md:block" /> */}
    </div>
  );
};

export default CategorySlider;

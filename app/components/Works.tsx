import React from "react";

import WorksSlider from "./WorksSlider";
import Link from "next/link";

export const homePageWorks = [
  {
    id: 1,
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
  },
  {
    id: 2,
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
  },
  {
    id: 3,
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
  },
  {
    id: 4,
    title: "Ортопедия",
    description: "Улучшение динамики и подвижности грудного отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
  },
];

const Works = () => {
  return (
    <div className="bg-[#F9F7FE] md:px-10 md:mx-10 md:mt-0 px-4 md:my-10 rounded-b-[15px] md:pb-10">
      {/* Slider */}
      <WorksSlider title="Упражнения" works={homePageWorks} />
      <Link
        href="complex"
        className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        Все 5304 Упражнения →
      </Link>
    </div>
  );
};

export default Works;

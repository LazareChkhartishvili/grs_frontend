import Image, { StaticImageData } from "next/image";
import React from "react";

import burger from "../../assets/images/burger.svg";
import store from "../../assets/images/store.svg";
import dropDown from "../../assets/images/dropDown.svg";
import person from "../../assets/images/person.svg";
import book from "../../assets/images/book.svg";

import { MobileLogo, SimpleLogo } from "./Logo";

interface CategoryCardProps {
  src: StaticImageData;
  alt: string;
  text: string;
  className?: string;
}

const menuItems = [
  { id: 1, name: "Все комплексы" },
  { id: 2, name: "О нас" },
  { id: 3, name: "Блог" },
  { id: 4, name: "Контакты" },
];

const IconButton = ({ src, alt }: { src: string; alt: string }) => (
  <div
    className="w-10 h-10 md:w-[70px] md:h-[70px] flex items-center justify-center rounded-[10px] md:rounded-[20px]"
    style={{ backgroundColor: "rgba(61, 51, 74, 0.3)" }}
  >
    <Image src={src} alt={alt} />
  </div>
);

const CategoryCard: React.FC<CategoryCardProps> = ({
  src,
  alt,
  text,
  className = "",
}) => (
  <div
    className={`flex items-center gap-2.5 rounded-[10px] p-2 bg-[rgba(61,51,74,0.3)] ${className}`}
  >
    <Image src={src} alt={alt} />
    <h3 className="text-white">{text}</h3>
  </div>
);

export const Header = () => (
  <>
    <MobileNavbar />
    <DesktopNavbar />
    <div className="mt-[152px] mx-2">
      <div className="flex flex-col w-full">
        {/* ზედა ბარათი */}
        <CategoryCard src={book} alt="book" text="15 категорий" />

        {/* ქვედა ორი ბარათი */}
        <div className="flex flex-row w-full gap-1 mt-2">
          <CategoryCard
            src={book}
            alt="book"
            text="15 категорий"
            className="w-[177px]"
          />
          <CategoryCard
            src={book}
            alt="book"
            text="15 категорий"
            className="w-[177px]"
          />
        </div>
      </div>
    </div>
  </>
);

const MobileNavbar = () => (
  <header className="px-2 py-6 md:hidden">
    <div
      className="px-2 py-[10px] flex justify-between items-center rounded-[20px]"
      style={{ backgroundColor: "rgba(61, 51, 74, 0.3)" }}
    >
      <IconButton src={burger} alt="Burger" />
      <MobileLogo />
      <IconButton src={store} alt="Store" />
    </div>

    {/* Indicator bars */}
    <div className="max-w-[313px] mt-6 flex gap-2 mx-auto">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`bg-white w-[72.25px] h-[4px] rounded-[20px] ${
            i === 0 ? "" : "opacity-20"
          }`}
        ></div>
      ))}
    </div>
  </header>
);

const DesktopNavbar = () => (
  <header className="p-5 md:flex hidden justify-between">
    <div
      style={{ backgroundColor: "rgba(61, 51, 74, 0.3)" }}
      className="min-w-[780px] flex p-3.5 items-center rounded-[20px]"
    >
      <SimpleLogo />
      <ul className="flex ml-[89px] mr-[73px] justify-between w-full">
        {menuItems.map(({ id, name }) => (
          <li
            key={id}
            className="text-white text-[18px] leading-[100%] tracking-[-1%]"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>

    <div className="flex items-center gap-4 ml-4">
      <div
        className="w-[70px] h-[70px] flex items-center gap-1 justify-center rounded-[20px] cursor-pointer"
        style={{ backgroundColor: "rgba(61, 51, 74, 0.3)" }}
      >
        <h4 className="text-white">RU</h4>
        <Image className="" src={dropDown} alt="dropDown" />
      </div>
      <IconButton src={store} alt="Store" />
      <IconButton src={person} alt="Person" />
    </div>
  </header>
);

export default Header;

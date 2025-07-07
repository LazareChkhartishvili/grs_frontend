"use client"
import React, { useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import Image from "next/image";

import WorksSlider from "../components/WorksSlider";
import Month from "../components/Months";
// import WorksSlider from "../components/WorksSlider";
// import { homePageWorks } from "";

const ShoppingCard = () => {
  const [click,setClick] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("1 месяц")
  const homePageWorks = [
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
  return (
    <div>
      <div className="bg-[#F9F7FE] md:pb-[100px] mb-[-100px] ">
        <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
        <MobileNavbar />
        <div className="flex md:flex-row md:items-start flex-col mx-2 md:mx-10 md:justify-between md:mb-10 md:pb-10  ">
           {/* LeftSide */}
          <div className="flex flex-col bg-white w-full md:w-[60%] lg:w-[72%] rounded-[20px] md:h-[832px] ">
            <div className="flex items-center justify-between px-[16px] pt-[16px] md:px-[40px] md:pt-[40px]">
              <h1 className="text-[#3D334A]">Корзина</h1>
              <h3 className="hidden lg:block text-[#D5D1DB]">Удалить все</h3>
            </div>
            <hr className="hidden lg:block h-[3px] w-full bg-[#F9F7FE] my-[40px]" />
            <div className="flex flex-col  max-h-[734px] overflow-y-auto">
            {/* item ეს ის ნაწილია რაც უნდა გამოიმაპოს  */}
            <div className="mt-[24px] px-[16px] md:px-[40px] md:mt-[0px] md:mb-[40px]">
              <div className="flex flex-col">
              <div className="flex gap-[8px] md:gap-[20px] items-start">
            <Image
                src={"/assets/images/blog1.png"}
                width={75}
                height={75}
                alt="image"
               />
               <div className="flex flex-col w-full">
                <div className="flex items-start w-full justify-between">
                  <div className="flex flex-col xl:w-[533px] md:w-[433px]">
                <h4 className="text-[#3D334A] text-[14px] md:text-[20px] xl:text-[24]">Комплекс упражнений №1 для грудного отдела позвоночника</h4>
                <p className="text-[#846FA0] text-[12px] md:text-[14px] xl:text-[18px]">Улучшение динамики и подвижности грудного отдела</p>
                  </div>
                <p className="text-[#3D334A] hidden md:block">950 ₽</p>
                </div>
                <div className="hidden md:flex w-full justify-between items-center mt-[25px] relative">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">{selectedMonth} <button onClick={() => setClick(!click)} className="bg-[#F9F7FE] w-[16px] h-[16px] rounded-[3px]"></button> </span></p>
                <p className="text-[#846FA0]">Удалить <span>Icon</span></p>
                {click && (
                 <Month
                  onSelect={(month) => {
                  setSelectedMonth(month);
                  setClick(false);
                  }}
                 />
                )}
                </div>
               </div>
              </div>
              <div className="flex w-full justify-between items-center md:hidden my-[24px] relative">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">{selectedMonth}<button onClick={() => setClick(!click)} className="bg-[#F9F7FE] w-[16px] h-[16px] rounded-[3px]"></button></span></p>
                <p className="text-[#3D334A] text-[15px]">950 ₽</p>
                {click && (
                 <Month
                  onSelect={(month) => {
                  setSelectedMonth(month);
                  setClick(false);
                  }}
                 />
                )}
              </div>
            </div> 
            </div>
              {/* item ეს ის ნაწილია რაც უნდა გამოიმაპოს  */}
            <div className="mt-[24px] px-[16px] md:px-[40px] md:mt-[0px] md:mb-[40px]">
              <div className="flex flex-col">
              <div className="flex gap-[8px] md:gap-[20px] items-start">
            <Image
                src={"/assets/images/blog1.png"}
                width={75}
                height={75}
                alt="image"
               />
               <div className="flex flex-col w-full">
                <div className="flex items-start w-full justify-between">
                  <div className="flex flex-col xl:w-[533px] md:w-[433px] ">
                <h4 className="text-[#3D334A] text-[14px] md:text-[20px] xl:text-[24]">Комплекс упражнений №1 для грудного отдела позвоночника</h4>
                <p className="text-[#846FA0] text-[12px] md:text-[14px] xl:text-[18px]">Улучшение динамики и подвижности грудного отдела</p>
                  </div>
                <p className="text-[#3D334A] hidden md:block">950 ₽</p>
                </div>
                <div className="hidden md:flex w-full justify-between items-center mt-[25px]">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">1 месяц</span></p>
                <p className="text-[#846FA0]">Удалить <span>Icon</span></p>
                </div>
               </div>
              </div>
              <div className="flex w-full justify-between items-center md:hidden my-[24px]">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">1 месяц</span></p>
                <p className="text-[#3D334A] text-[15px]">950 ₽</p>
              </div>
            </div> 
            </div>
              {/* item ეს ის ნაწილია რაც უნდა გამოიმაპოს  */}
            <div className="mt-[24px] px-[16px] md:px-[40px] md:mt-[0px] md:mb-[40px]">
              <div className="flex flex-col">
              <div className="flex gap-[8px] md:gap-[20px] items-start">
            <Image
                src={"/assets/images/blog1.png"}
                width={75}
                height={75}
                alt="image"
               />
               <div className="flex flex-col w-full">
                <div className="flex items-start w-full justify-between">
                  <div className="flex flex-col xl:w-[533px] md:w-[433px] ">
                <h4 className="text-[#3D334A] text-[14px] md:text-[20px] xl:text-[24]">Комплекс упражнений №1 для грудного отдела позвоночника</h4>
                <p className="text-[#846FA0] text-[12px] md:text-[14px] xl:text-[18px]">Улучшение динамики и подвижности грудного отдела</p>
                  </div>
                <p className="text-[#3D334A] hidden md:block">950 ₽</p>
                </div>
                <div className="hidden md:flex w-full justify-between items-center mt-[25px]">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">1 месяц</span></p>
                <p className="text-[#846FA0]">Удалить <span>Icon</span></p>
                </div>
               </div>
              </div>
              <div className="flex w-full justify-between items-center md:hidden my-[24px]">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">1 месяц</span></p>
                <p className="text-[#3D334A] text-[15px]">950 ₽</p>
              </div>
            </div> 
            </div>
             {/* item ეს ის ნაწილია რაც უნდა გამოიმაპოს  */}
             <div className="mt-[24px] px-[16px] md:px-[40px] md:mt-[0px] md:mb-[40px]">
              <div className="flex flex-col">
              <div className="flex gap-[8px] md:gap-[20px] items-start">
            <Image
                src={"/assets/images/blog1.png"}
                width={75}
                height={75}
                alt="image"
               />
               <div className="flex flex-col w-full">
                <div className="flex items-start w-full justify-between">
                  <div className="flex flex-col xl:w-[533px] md:w-[433px] ">
                <h4 className="text-[#3D334A] text-[14px] md:text-[20px] xl:text-[24]">Комплекс упражнений №1 для грудного отдела позвоночника</h4>
                <p className="text-[#846FA0] text-[12px] md:text-[14px] xl:text-[18px]">Улучшение динамики и подвижности грудного отдела</p>
                  </div>
                <p className="text-[#3D334A] hidden md:block">950 ₽</p>
                </div>
                <div className="hidden md:flex w-full justify-between items-center mt-[25px]">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">1 месяц</span></p>
                <p className="text-[#846FA0]">Удалить <span>Icon</span></p>
                </div>
               </div>
              </div>
              <div className="flex w-full justify-between items-center md:hidden my-[24px]">
                <p className="text-[#846FA0] text-[12px]">Срок подписки: <span className="text-[#D4BAFC] text-[12px]">1 месяц</span></p>
                <p className="text-[#3D334A] text-[15px]">950 ₽</p>
              </div>
            </div> 
            </div>


           </div>
          </div>

           {/* RightSide */}
           <div className=" w-full md:w-[26.5%]">
          <div className="flex flex-col bg-white rounded-[10px] py-[16px] mt-[8px] md:mt-[0px] md:w-full  ">
            <div className="flex flex-col px-[20px] gap-[40px]">
              <div className="flex  w-full justify-between items-center">
                <p className="text-[#846FA0] text-[14px]">Товаров</p>
                <p className="text-[#3D334A] text-[14px]">5 шт.</p>
                </div>
                <div className="flex  w-full justify-between items-center">
                <p className="text-[#846FA0] text-[14px]">Всего на сумму</p>
                <p className="text-[#3D334A] text-[14px]">7450 ₽</p>
                </div>
                <div className="flex  w-full justify-between items-center">
                <p className="text-[#846FA0] text-[14px]">Скидки</p>
                <p className="text-[#3D334A] text-[14px]">1000 ₽</p>
                </div>
                <button className="bg-[url('/assets/images/bluebg.jpg')] rounded-[10px] bg-cover py-[17px] w-full mt-4 cursor-pointer hidden lg:block">Оплатить</button>
            </div>
          </div>
          <button className="bg-[url('/assets/images/bluebg.jpg')] rounded-[10px] bg-cover py-[17px] w-full mt-4 cursor-pointer mb-[16px] md:hidden">Оплатить</button>
          </div>
        </div>
        {/*  */}
        <WorksSlider works={homePageWorks} link="/" className="bg-white rounded-[20px] md:rounded-[30px] md:mx-10 md:pt-[40px] " />
      </div>
      {/* <hr className="h-[4px] bg-[#F9F7FE] t-[100px]" /> */}
    </div>
  );
};

export default ShoppingCard;

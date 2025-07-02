"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import MobileNavbar from "./Navbar/MobileNavbar";
import DesktopNavbar from "./Navbar/DesktopNavbar";

export interface MenuItem {
  id: number;
  name: string;
  route: string;
}

interface HeaderProps {
  menuItems?: MenuItem[];
  variant?: "default" | "rehabilitation" | "complex" | "category";
}

export const defaultMenuItems: MenuItem[] = [
  { id: 1, name: "Все комплексы", route: "complex" },
  { id: 2, name: "О нас", route: "about" },
  { id: 3, name: "Блог", route: "blog" },
  { id: 4, name: "Контакты", route: "contact" },
];

const categories = [
  { id: 1, text: "15 категорий", image: "/assets/images/book.svg" },
  { id: 2, text: "Магазины", image: "/assets/images/store.svg" },
  { id: 3, text: "Рестораны", image: "/assets/images/camera.svg" },
];

const Header: React.FC<HeaderProps> = ({
  menuItems = defaultMenuItems,
  variant = "default",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(currentSlide);

  const handleRightArrowClick = () => {
    setCurrentSlide(1);
  };

  const handleLeftArrowClick = () => {
    setCurrentSlide(0);
  };

  return (
    <header
      className={`md:m-5 rounded-[20px] ${
        variant == "rehabilitation" ? "h-[438px]" : "h-screen"
      } `}
    >
      <div className="relative w-full rounded-[20px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg absolute h-[838px] object-cover z-[-1] md:rounded-[20px]"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 ">
          <MobileNavbar />
          {variant !== "category" && <DesktopNavbar menuItems={menuItems} />}
          {/* HeroTitle */}
          {variant == "default" && (
            <h2 className="mx-5  hidden md:flex text-[64px] mt-20 leading-[100%]  tracking-[-3%] max-w-[994px]">
              экосистема продуктов направленная на формирование вашего здоровья
            </h2>
          )}
          {variant == "rehabilitation" && (
            <div className="flex flex-col gap-0 px-5">
              <h2 className="mx-5  hidden md:flex text-[64px] md:mt-[40px] leading-[100%] tracking-[-3%] max-w-[994px]">
                СОВРЕМЕННЫЕ ИЗРАИЛЬСКИЕ МЕТОДИКИ РЕАБИЛИТАЦИИ
              </h2>
              {currentSlide === 1 && (
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  exit={{ opacity: 0, x: -100 }}
                  className="leading-[120%] md:px-5 text-[32px] font-medium md:max-w-[592px] md:mt-[92px] font-[Pt] "
                >
                  Для восстановления и поддержания подвижности и
                  трудоспособности
                </motion.p>
              )}
            </div>
          )}

          {/* Section */}
          {variant == "default" && (
            <div className={`${currentSlide === 0 ? "mt-[300px]" : ""}`}>
              <AnimatePresence mode="wait">
                {currentSlide === 1 && (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <>
                      <section className="mt-[152px] md:mt-[29px] mx-2 md:mx-5 flex flex-col md:flex-row md:items-center md:gap-2">
                        {/* პირველი ბარათი */}
                        <motion.div
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="flex items-center gap-2.5 bg-[rgba(61,51,74,0.3)] px-2.5 rounded-[12px] h-[64px] w-full md:w-[246px]"
                        >
                          <div className="bg-[rgba(255,255,255,0.2)] w-[46px] h-[46px] justify-center items-center flex rounded-[8px]">
                            <Image
                              src={categories[0].image}
                              alt={categories[0].text}
                              width={30}
                              height={30}
                            />
                          </div>
                          <h3 className="text-white text-sm font-medium font-[Pt]">
                            {categories[0].text}
                          </h3>
                        </motion.div>

                        {/* მეორე და მესამე ბარათები */}
                        <div className="flex flex-row gap-2 mt-2 md:mt-0 w-full font-[Pt]">
                          {categories.slice(1).map((item) => (
                            <motion.div
                              initial={{ opacity: 0, x: -100 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              key={item.id}
                              className="flex items-center gap-2.5 bg-[rgba(61,51,74,0.3)] px-2.5 rounded-[12px] h-[64px] w-full md:w-[246px]"
                            >
                              <div className="bg-[rgba(255,255,255,0.2)] w-[46px] h-[46px] justify-center items-center flex rounded-[8px]">
                                <Image
                                  src={item.image}
                                  alt={item.text}
                                  width={30}
                                  height={30}
                                />
                              </div>
                              <h3 className="text-white text-sm font-medium">
                                {item.text}
                              </h3>
                            </motion.div>
                          ))}
                        </div>
                      </section>

                      <section className="mx-2 md:mt-5 md:mx-5 max-w-[729px]">
                        <div className="bg-[rgba(61,51,74,0.3)]  rounded-[20px] md:gap-[73.2px] gap-5 flex flex-col pl-[30px] pt-[30px] pb-[31px] mt-2">
                          <h2 className="text-[20px] md:text-[40px] leading-[120%] tracking-[-3%]">
                            Реабилитация
                          </h2>
                          <p className="leading-[120%] font-medium md:max-w-[719px] text-[24px] font-[Pt] ">
                            Современные израильские методики реабилитации по
                            направлениям ортопедия, неврология,
                            посттравматическая реабилитация походки и др.
                          </p>
                        </div>
                      </section>
                    </>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {variant !== "category" && (
            <header className="header">
              <div
                className={`absolute w-full ${
                  variant == "default" ? "mt-[11.7px]" : "top-[286.7px]"
                } hidden lg:flex ${
                  currentSlide === 0 && variant == "default" && " top-[80.9px]"
                } ${
                  currentSlide === 0 &&
                  variant == "rehabilitation" &&
                  "top-[480px]"
                } ${
                  currentSlide === 1 &&
                  variant == "rehabilitation" &&
                  " bottom-0 top-[311px]"
                }`}
              >
                <div className="sub-header1"></div>
                <div className="sub-header2">
                  <div className="purple-cutout "></div>
                  <div className={`cutout-container `}>
                    <div className="purp1">purpple1</div>
                    <div className={`white-cutout `}>
                      <div className={`bg-[#3D334A] p-5 -mt-8 `}>
                        <h3 className="text-[24px] ">Изучить подробнее</h3>
                      </div>
                      {variant == "default" && (
                        <div className="bg-[url('/assets/images/marketPlace.png')] bg-cover p-5 -mt-8">
                          <h3 className="text-[24px]">В каталог</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </header>
          )}

          {/*  */}
          <div
            className={`hidden absolute md:flex flex-row items-center right-10 ${
              variant == "rehabilitation" ? "bottom-14" : "bottom-84"
            } ${currentSlide === 0 && " bottom-0 top-[457px]"} ${
              currentSlide === 0 &&
              variant == "rehabilitation" &&
              " bottom-0 top-[460px]"
            } ${
              currentSlide === 1 &&
              variant == "rehabilitation" &&
              " bottom-0 top-[450px]"
            }`}
          >
            <div
              onClick={handleLeftArrowClick}
              className={`w-[70px] h-[70px]  ${
                currentSlide === 0 ? "bg-[#857b9299]" : "bg-[#3D334A99]"
              } rounded-[20px] flex items-center justify-center mr-2.5 cursor-pointer`}
            >
              <Image
                src={"/assets/images/rightIcon.svg"}
                alt="rightIcon"
                width={11}
                height={9}
              />
            </div>
            <div
              onClick={handleRightArrowClick}
              className={`w-[70px] h-[70px]  ${
                currentSlide === 0 ? "bg-[#3D334A99]" : "bg-[#857b9299]"
              } rounded-[20px] flex items-center justify-center cursor-pointer`}
            >
              {" "}
              <Image
                src={"/assets/images/leftIcon.svg"}
                alt="leftIcon"
                width={11}
                height={9}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

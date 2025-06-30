import React from "react";

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
}) => (
  <header
    className={`md:m-5 rounded-[20px] ${variant == "category" && "h-screen"}`}
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
            <h2 className="mx-5  hidden md:flex text-[64px] leading-[100%] tracking-[-3%] max-w-[894px]">
              СОВРЕМЕННЫЕ ИЗРАИЛЬСКИЕ МЕТОДИКИ РЕАБИЛИТАЦИИ
            </h2>
            <p className="leading-[120%] text-[32px] font-medium md:max-w-[792px] md:mt-[92px]">
              Для восстановления и поддержания подвижности и трудоспособности
            </p>
          </div>
        )}

        {/* Section */}
        {variant == "default" && (
          <div>
            <section className="mt-[152px] md:mt-[29px] mx-2 md:mx-5 flex flex-col md:flex-row md:items-center md:gap-2">
              {/* პირველი ბარათი */}
              <div className="flex items-center gap-2.5 bg-[rgba(61,51,74,0.3)] px-2.5 rounded-[12px] h-[64px] w-full md:w-[246px]">
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
              </div>

              {/* მეორე და მესამე ბარათები */}

              <div className="flex flex-row gap-2 mt-2 md:mt-0 w-full font-[Pt]">
                {categories.slice(1).map((item) => (
                  <div
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
                  </div>
                ))}
              </div>

              {/*  */}
            </section>
            {/*  */}
            <section className="mx-2 md:mt-5 md:mx-5 max-w-[729px]">
              <div className="bg-[rgba(61,51,74,0.3)]  rounded-[20px] md:gap-[73.2px] gap-5 flex flex-col pl-[30px] pt-[30px] pb-[31px] mt-2">
                <h2 className="text-[20px] md:text-[40px] leading-[120%] tracking-[-3%]">
                  Реабилитация
                </h2>
                <p className="leading-[120%] font-medium md:max-w-[719px] text-[24px] font-[Pt] ">
                  Современные израильские методики реабилитации по направлениям
                  ортопедия, неврология, посттравматическая реабилитация походки
                  и др.
                </p>
              </div>
            </section>
          </div>
        )}
        {variant !== "category" && (
          <header className="header">
            <div
              className={`absolute w-full ${
                variant == "default" ? "mt-[11.7px]" : "top-[286.7px]"
              } hidden lg:flex`}
            >
              <div className="sub-header1"></div>
              <div className="sub-header2">
                <div className="purple-cutout "></div>
                <div className="cutout-container ">
                  <div className="purp1">purpple1</div>
                  <div className="white-cutout ">
                    <div className="bg-[#3D334A] p-5 -mt-8">
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
          }`}
        >
          <div className="w-[70px] h-[70px] bg-[#857b9299] rounded-[20px] flex items-center justify-center mr-2.5">
            <Image
              src={"/assets/images/rightIcon.svg"}
              alt="rightIcon"
              width={11}
              height={9}
            />
          </div>
          <div className="w-[70px] h-[70px] bg-[#3D334A99] rounded-[20px] flex items-center justify-center">
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

export default Header;

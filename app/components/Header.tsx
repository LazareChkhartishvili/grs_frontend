import React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
}

interface HeaderProps {
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { id: 1, name: "Все комплексы" },
  { id: 2, name: "О нас" },
  { id: 3, name: "Блог" },
  { id: 4, name: "Контакты" },
];

const categories = [
  { id: 1, text: "15 категорий", image: "/assets/images/book.svg" },
  { id: 2, text: "Магазины", image: "/assets/images/store.svg" },
  { id: 3, text: "Рестораны", image: "/assets/images/camera.svg" },
];

const Header: React.FC<HeaderProps> = ({ menuItems = defaultMenuItems }) => (
  <div className="md:m-5 md:rounded-[20px] max-h-[818px]">
    <div className="relative w-full h-screen md:rounded-[20px] rounded-none">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-[818px] object-cover z-[-1] md:rounded-[20px] rounded-none rounded-br-4xl"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 md:rounded-[20px] rounded-none">
        <MobileNavbar />
        <DesktopNavbar menuItems={menuItems} />
        {/* HeroTitle */}
        <h2 className="mx-5 mt-[82px] hidden md:flex text-[64px] leading-[100%] tracking-[-3%] max-w-[894px]">
          экосистема продуктов направленная на формирование вашего здоровья
        </h2>
        {/* Section */}
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
            <h3 className="text-white text-sm font-medium">
              {categories[0].text}
            </h3>
          </div>

          {/* მეორე და მესამე ბარათები */}
          <div className="flex flex-row gap-2 mt-2 md:mt-0 w-full">
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
                <h3 className="text-white text-sm font-medium">{item.text}</h3>
              </div>
            ))}
          </div>

          {/*  */}
        </section>
        {/*  */}
        <section className="mx-2 md:mt-5 md:mx-5 max-w-[729px]">
          <div className="bg-[rgba(61,51,74,0.3)] rounded-[30px] md:gap-[81px] gap-5 flex flex-col pl-[30px] pt-[30px] pb-[31px] mt-2">
            <h2 className="text-[20px] md:text-[40px] leading-[120%] tracking-[-3%]">
              Реабилитация
            </h2>
            <p className="leading-[120%] font-medium md:max-w-[519px]">
              Современные израильские методики реабилитации по направлениям
              ортопедия, неврология, посттравматическая реабилитация походки и
              др.
            </p>
          </div>
        </section>
        {/*  */}
        <section className="md:bg-white md:h-[250px] md:absolute -bottom-10 right-0 rounded-t-[40px] ml-2 rounded-tl-[20px] w-[500px]">
          <div className="flex items-center md:mr-18 md:justify-end mt-10 gap-2">
            <div className="w-[176px] h-[166px] bg-[#3D334A] rounded-[20px] pt-4 pl-4">
              <h2 className="text-[18px] leading-[90%] uppercase">
                Изучить подробнее
              </h2>
            </div>
            <div className="w-[176px] h-[166px] bg-[#3D334A] rounded-[20px] pt-4 pl-4">
              <h2 className="text-[18px] leading-[90%] uppercase">
                Изучить подробнее
              </h2>
            </div>
          </div>
        </section>
        {/*  */}
        <div className="hidden absolute md:flex flex-row items-center right-10 bottom-60 ">
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
  </div>
);

export default Header;

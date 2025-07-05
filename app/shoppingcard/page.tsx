import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import Image from "next/image";
// import WorksSlider from "../components/WorksSlider";
// import { homePageWorks } from "../components/Works";

const ShoppingCard = () => {
  return (
    <div>
      <div className="bg-[#F9F7FE] ">
        <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
        <MobileNavbar />
        {/* LeftSide */}
        <div className="flex md:flex-row md:justify-between flex-col mx-2 md:mx-10 md:gap-[60px] md:mb-10 md:pb-10">
          <div className="flex flex-col md:flex-row md:justify-between md:min-w-[1000px] items-center p-4 md:p-10 bg-white  rounded-[20px]">
            <div className="w-full md:flex-col ">
              <div className="">
                <div className="flex items-center justify-between ">
                  <h1 className="text-[#3D334A] text-[24px] md:text-[40px] leading-[120%] tracking-[-3px]">
                    Корзина
                  </h1>
                  <span className="hidden md:flex text-[#D5D1DB] text-[24px] leading-[120%]">
                    Удалить все
                  </span>
                </div>
                <div className="flex items-start gap-4 mt-4">
                  <Image
                    src={"/assets/images/blog1.png"}
                    width={75}
                    height={75}
                    alt="image"
                  />
                  <div>
                    <h3 className="text-[#3D334A] text-[18px] leading-[120%] tracking-[-1.1%]">
                      Комплекс упражнений №1 для грудного отдела позвоночника
                    </h3>
                    <p className="text-[#846FA0] text-[14px]">
                      Улучшение динамики и подвижности грудного отдела
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <h5 className="text-[#3D334A]">Срок подписки: 1 месяц</h5>
                  <span className="text-[#3D334A]">950 ₽</span>
                </div>
              </div>
            </div>

            {/* RightSide */}
          </div>
          <div className="bg-white p-4 mt-4 md:w-[334px] rounded-[20px]">
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0]">Товаров</h5>
              <span className="text-[#3D334A]">5 шт.</span>
            </div>
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0]">Всего на сумму</h5>
              <span className="text-[#3D334A]">7450 ₽</span>
            </div>
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0]">Скидки</h5>
              <span className="text-[#3D334A]">1000 ₽</span>
            </div>
            <div className="flex items-center justify-between">
              <h5 className="text-[#846FA0]">Итого</h5>
              <span className="text-[#3D334A]">1000 ₽</span>
            </div>
            <button className="bg-[url('/assets/images/bluebg.jpg')] rounded-[10px] bg-cover py-[17px] w-full mt-4 cursor-pointer">
              Оплатить
            </button>
          </div>
        </div>
        {/*  */}
        {/* <WorksSlider works={homePageWorks} /> */}
      </div>
    </div>
  );
};

export default ShoppingCard;

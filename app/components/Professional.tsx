import React from "react";

import Link from "next/link";
import SliderArrows from "./SliderArrows";
import CourseSlider from "./CourseSlider";

const Professional = () => {
  return (
    <div className="py-10 mb-10 md:mx-10 bg-[#F9F7FE]">
      {/* <Banner
        backgroundUrl="/assets/images/marketPlace.png"
        logoUrl="/assets/images/simpleLogo.svg"
      /> */}
      <div className="px-4">
        <h1 className="text-[20px] md:mt-10 md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          Профразвитие
        </h1>
        <p className="text-[#846FA0] text-[18px] md:max-w-[1320px] md:text-[24px] leading-[120%] md:leading-[100%] mb-5">
          Раздел обучение и профессиональное развитие в области реабилитации,
          физиотерапии и лечебно-восстановительного массажа -это коллаборация с
          Израильскими специалистами и центрами обучения, например, таким как
          Колледжем медицинского массажа, основателем руководителем которого
          является доктор Аарон Яакоби.
        </p>
        <Link
          className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
          href=""
        >
          Изучить →
        </Link>
        <hr className=" md:mt-10 mt-5 bg-[#D5D1DB] text-[#D5D1DB]" />
        <div className="bg-[#F9F7FE] mt-4 md:mt-[50px] md:mb-[45px] rounded-2xl">
          <div className="flex items-center justify-between md:mb-[10px]">
            <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
              Курсы
            </h1>
            <SliderArrows />
          </div>

          <CourseSlider />
          <h1 className="md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]">
            Все 439 курсов →
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Professional;

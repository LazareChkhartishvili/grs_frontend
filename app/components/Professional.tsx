import React from "react";
import Banner from "./Banner";
import Link from "next/link";
import SliderArrows from "./SliderArrows";
import CourseSlider from "./CourseSlider";

const Professional = () => {
  return (
    <div className="my-10">
      <Banner
        backgroundUrl="/assets/images/marketPlace.png"
        logoUrl="/assets/images/simpleLogo.svg"
      />
      <div className="md:px-5 px-4">
        <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          Профразвитие
        </h1>
        <p className="text-[#846FA0] text-[18px] md:max-w-[1000px] md:text-[24px] leading-[120%] md:leading-[100%] mb-5">
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
        <div className="bg-[#F9F7FE]  mt-4 md:mt-0 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
              Курсы
            </h1>
            <SliderArrows />
          </div>

          <CourseSlider />
        </div>
      </div>
    </div>
  );
};

export default Professional;

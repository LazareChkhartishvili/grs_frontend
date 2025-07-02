"use client";

import React, { useRef } from "react";
import Link from "next/link";
import SliderArrows from "./SliderArrows";
import CourseSlider from "./CourseSlider";
import { useCourses } from "../hooks/useCourses";
import Banner from "./Banner";

const Professional = () => {
  const { courses, loading, error } = useCourses();

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="mb-10 md:mx-5 bg-[#F9F7FE]">
      <Banner
        backgroundUrl="/assets/images/bluebg.jpg"
        logoUrl="/assets/images/simpleLogo.svg"
        icon="/assets/images/profIcon.png"
        iconHeight={50}
        iconWidth={170}
      />
      <div className="md:p-10 px-5">
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
          href="professional"
        >
          Изучить →
        </Link>
        <hr className="md:mt-10 mt-5 bg-[#D5D1DB] text-[#D5D1DB]" />
        <div className="bg-[#F9F7FE] mt-4 md:mt-[50px] md:mb-[45px] rounded-2xl">
          <div className="flex items-center justify-between md:mb-[10px]">
            <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
              Курсы
            </h1>
            <SliderArrows
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-2">შეცდომა კურსების ჩატვირთვაში</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          ) : (
            <div
              ref={sliderRef}
              className="overflow-x-auto scrollbar-hide flex gap-4 mb-6"
            >
              <CourseSlider courses={courses} />
            </div>
          )}

          <Link
            href={"/allCourse"}
            className="md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
          >
            Все {courses.length} курсов →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Professional;

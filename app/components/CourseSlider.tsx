import Image from "next/image";
import React from "react";

const CourseSlider = () => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex flex-row gap-4 w-max md:w-auto mb-10">
        <div className="bg-white rounded-[20px] p-1.5 pb-4 w-[248px] md:w-[690px] md:h-[518px]">
          {/* Mobile image */}
          <Image
            src="/assets/images/course.png"
            width={236}
            height={172}
            alt="courseImage"
            className="mb-5 w-full md:hidden"
          />
          {/* Desktop image (better quality) */}
          <Image
            src="/assets/images/bigCourse.png"
            width={674}
            height={300}
            alt="courseImage"
            className="mb-5 w-full hidden md:block"
          />

          <span className="bg-[#E9DFF6] p-[4.5px] rounded-[3px] text-[#3D334A]">
            Ортопедия
          </span>
          <h5 className="text-[#3D334A] md:text-[32px] mb-2 mt-4 md:mb-5 leading-[120%]">
            Курсы и мастер-классы для опытных терапевтов. Практикум по лечению
            ортопедических проблем
          </h5>
          <p className="text-[#846FA0] md:text-[14px] mb-[14px] leading-[120%]">
            С советами по безопасности, которым нужно следовать до и после
            перелома Кристен Гасник
          </p>
          <div className="w-full flex justify-end items-end pr-4 md:mt-5">
            <button className="bg-[#D4BAFC] py-[5px] px-4 rounded-[3px] text-[12px] md:text-[24px]">
              4023 $
            </button>
          </div>
        </div>

        {/* მეორე ბარათიც იგივე პრინციპით */}
        <div className="bg-white p-1.5 pb-4 rounded-[20px] w-[248px] md:w-[690px] md:h-[518px]">
          {/* Mobile image */}
          <Image
            src="/assets/images/course.png"
            width={236}
            height={172}
            alt="courseImage"
            className="mb-5 w-full md:hidden"
          />
          {/* Desktop image (better quality) */}
          <Image
            src="/assets/images/bigCourse.png"
            width={674}
            height={300}
            alt="courseImage"
            className="mb-5 w-full hidden md:block"
          />

          <span className="bg-[#E9DFF6] p-[4.5px] rounded-[3px] text-[#3D334A]">
            Ортопедия
          </span>
          <h5 className="text-[#3D334A] md:text-[32px] mb-2 mt-4 md:mb-5 leading-[120%]">
            Курсы и мастер-классы для опытных терапевтов. Практикум по лечению
            ортопедических проблем
          </h5>
          <p className="text-[#846FA0] md:text-[14px] mb-[14px] leading-[120%]">
            С советами по безопасности, которым нужно следовать до и после
            перелома Кристен Гасник
          </p>
          <div className="w-full flex justify-end items-end pr-4 md:mt-5">
            <button className="bg-[#D4BAFC] py-[5px] px-4 rounded-[3px] text-[12px] md:text-[24px]">
              4023 $
            </button>
          </div>
        </div>
        <div className="bg-white rounded-[20px] p-1.5 pb-4  w-[248px] md:w-[690px] md:h-[518px]">
          {/* Mobile image */}
          <Image
            src="/assets/images/course.png"
            width={236}
            height={172}
            alt="courseImage"
            className="mb-5 w-full md:hidden"
          />
          {/* Desktop image (better quality) */}
          <Image
            src="/assets/images/bigCourse.png"
            width={674}
            height={300}
            alt="courseImage"
            className="mb-5 w-full hidden md:block"
          />

          <span className="bg-[#E9DFF6] p-[4.5px] rounded-[3px] text-[#3D334A]">
            Ортопедия
          </span>
          <h5 className="text-[#3D334A] md:text-[32px] mb-2 mt-4 md:mb-5 leading-[120%]">
            Курсы и мастер-классы для опытных терапевтов. Практикум по лечению
            ортопедических проблем
          </h5>
          <p className="text-[#846FA0] md:text-[14px] mb-[14px] leading-[120%]">
            С советами по безопасности, которым нужно следовать до и после
            перелома Кристен Гасник
          </p>
          <div className="w-full flex justify-end items-end pr-4 md:mt-5">
            <button className="bg-[#D4BAFC] py-[5px] px-4 rounded-[3px] text-[12px] md:text-[24px]">
              4023 $
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSlider;

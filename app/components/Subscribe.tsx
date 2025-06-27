import Image from "next/image";
import React from "react";

const Subscribe = () => {
  return (
    <div className="mb-6 md:mb-10 md:px-5">
      <div className="bg-[url('/assets/images/hero.jpg')] bg-cover w-[359px] md:w-full md:h-[424px] rounded-[20px] md:px-5  mx-auto md:mx-0 p-4 gap-5 ">
        <h1 className="mb-5 md:mb-[72px] text-[20px] md:text-[64px] md:max-w-[1308px] md:pr-[52px] tracking-[-3%] md:pt-[48px] leading-[100%]">
          Приобретите подписку для получения доступа к контенту платформы
        </h1>
        <div className="flex items-center cursor-pointer rounded-[10px] gap-5 px-[15px] w-[327px] md:w-[562px] bg-white text-[#3D334A]">
          <button className=" py-[13px] text-[18px]  font-medium ">
            Приобрести подписку
          </button>
          <Image
            src={"/assets/images/rightArrow.svg"}
            alt="rightArrow"
            width={13}
            height={9.5}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;

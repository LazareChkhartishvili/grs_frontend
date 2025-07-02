import Link from "next/link";
import React from "react";
import Banner from "./Banner";

const Rehabilitation = () => {
  return (
    <div className="bg-[#F9F7FE] md:mt-32 md:mx-5">
      {/* <div className="bg-[url('/assets/images/blog.png')] rounded-t-[20px] md:pl-10 flex items-start justify-center md:justify-normal pt-6 w-full h-[97px] md:h-[150px] md:mb-10 bg-cover bg-center">
        <Image
          src={"/assets/images/simpleLogo.svg"}
          width={105}
          height={40}
          alt="logo"
          className=""
        />
        <Image
          src={"/assets/icons/rehabilitation.png"}
          alt="rehabilitation"
          width={166}
          height={19}
          className=""
        />
      </div> */}
      <Banner
        backgroundUrl="/assets/images/continueWatchingBanner.jpg"
        logoUrl="/assets/images/simpleLogo.svg"
        icon="/assets/icons/rehabilitation.png"
      />
      <div className="md:p-10 px-4">
        <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          Реабилитация
        </h1>
        <p className="text-[#846FA0] text-[18px] md:text-[32px] font-medium leading-[120%] md:leading-[100%] mb-5">
          Современные израильские методики реабилитации для восстановления и
          поддержания подвижности и трудоспособности
        </p>
        <Link
          className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
          href={"/rehabilitation"}
        >
          ИЗучить →
        </Link>
        <hr className="md:mt-10 mt-5 bg-[#D5D1DB] text-[#D5D1DB]" />
      </div>
    </div>
  );
};

export default Rehabilitation;

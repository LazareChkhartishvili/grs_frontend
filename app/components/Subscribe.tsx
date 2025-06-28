"use client";

import Image from "next/image";
import React from "react";

interface SubscribeProps {
  backgroundImage?: string;
  title?: string;
  buttonText?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  containerStyles?: string;
  titleStyles?: string;
  buttonStyles?: string;
  subTitle?: string;
  bgColor?: string;
}

const Subscribe = ({
  backgroundImage = "/assets/images/hero.jpg",
  title = "Приобретите подписку для получения доступа к контенту платформы",
  buttonText = "Приобрести подписку",
  buttonTextColor = "#3D334A",
  buttonBgColor = "#ffffff",
  containerStyles = "",
  titleStyles = "",
  buttonStyles = "",
  subTitle = "",
  bgColor = "",
}: SubscribeProps) => {
  return (
    <div className={`mb-6 md:mb-10 mt-10 md:mt-0 md:px-5 ${containerStyles}`}>
      <div
        className={`bg-cover w-[359px] md:w-full md:h-[424px] rounded-[20px] md:px-5 mx-auto md:mx-0 p-4 gap-5`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: bgColor,
        }}
      >
        <div>
          <h1
            className={`mb-5 text-[#3D334A] text-[20px] md:text-[64px] md:max-w-[1308px] md:pr-[52px] tracking-[-3%] md:pt-[48px] leading-[100%] ${titleStyles}`}
          >
            {title}
          </h1>
          <p className="text-[#3D334A]">{subTitle}</p>
        </div>
        <div
          className={`flex items-center cursor-pointer md:mt-[70px] mt-10 rounded-[10px] gap-5 px-[15px] w-[327px] md:w-[562px]`}
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
          }}
        >
          <button
            className={`py-[13px] text-[18px] font-medium  ${buttonStyles}`}
          >
            {buttonText}
          </button>
          <Image
            src="/assets/images/rightArrow.svg"
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

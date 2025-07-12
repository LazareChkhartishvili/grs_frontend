"use client";
import Link from "next/link";
import React from "react";
import Banner from "./Banner";
import { useI18n } from "../context/I18nContext";

const Rehabilitation = () => {
  const { t } = useI18n();

  return (
    <div className="bg-[#F9F7FE] md:mt-32 md:mx-5 mt-[200px]">
      <Banner
        backgroundUrl="/assets/images/continueWatchingBanner.jpg"
        logoUrl="/assets/images/simpleLogo.svg"
        icon="/assets/icons/Rehabilitation.png"
      />
      <div className="md:p-10 px-4">
        <h1 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          {t('rehabilitation.title')}
        </h1>
        <p className="text-[#846FA0] font-[Pt] text-[18px] md:text-[32px] font-medium leading-[120%] md:leading-[100%] mb-5">
          {t('rehabilitation.description')}
        </p>
        <Link
          className="text-[14px] md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
          href={"/rehabilitation"}
        >
          {t('rehabilitation.learn_more')}
        </Link>
        <hr className="md:mt-10 mt-5 bg-[#D5D1DB] text-[#D5D1DB]" />
      </div>
    </div>
  );
};

export default Rehabilitation;

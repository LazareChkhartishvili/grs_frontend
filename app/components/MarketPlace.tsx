import React from "react";
import Banner from "./Banner";

const MarketPlace = () => {
  return (
    <div className="bg-[#F9F7FE] md:mx-10 md:mb-10 mb-6">
      <Banner
        backgroundUrl="/assets/images/marketPlace.png"
        logoUrl="/assets/images/simpleLogo.svg"
      />
      <div className="flex flex-col items-start md:items-baseline gap-10 px-4 pb-4">
        <p className="text-[#3D334A] md:text-[24px] md:p-10 md:max-w-[838px] font-medium leading-[120%]">
          Мы развиваем направление МАРКЕТПЛЭЙС. Нашими партнерами в этом
          направлении могут стать реабилитационные центры, клиники, санатории,
          спортклубы, массаж …
        </p>
        <span className="text-[#846FA0] md:items-end w-full  items-end flex md:justify-end md:pr-10 md:pb-10 md:text-[32px] md:leading-[90%]">
          В разработке
        </span>
      </div>
    </div>
  );
};

export default MarketPlace;

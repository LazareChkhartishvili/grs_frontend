import Image from "next/image";

import React from "react";

interface BannerProps {
  backgroundUrl: string;
  logoUrl: string;
}

const Banner: React.FC<BannerProps> = ({ backgroundUrl, logoUrl }) => {
  return (
    <div className="bg-[#F9F7FE] pt-5 md:pt-0 px-2 md:px-5">
      <div
        className="rounded-t-[20px] md:pl-10 flex items-start justify-center md:justify-normal pt-6 w-full h-[97px] md:h-[150px] md:mb-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <Image src={logoUrl} width={105} height={40} alt="logo" />
      </div>
    </div>
  );
};

export default Banner;

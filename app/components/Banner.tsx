import React from "react";
import Image from "next/image";

interface BannerProps {
  backgroundUrl: string;
  logoUrl: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
}

const Banner: React.FC<BannerProps> = ({
  backgroundUrl,
  logoUrl,
  icon,
  iconWidth = 269,
  iconHeight = 32,
}) => {
  return (
    <div className="bg-[#F9F7FE] pt-5 md:pt-0 mx-2 md:mx-0">
      <div
        className="rounded-t-[20px] mb-4 flex-col md:mb-0 md:pl-10 flex items-start justify-center md:justify-normal pt-6 w-full h-[97px] md:h-[150px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="flex items-start gap-2">
          <Image src={logoUrl} width={189} height={66} alt="logo" />
          {icon && (
            <Image
              src={icon}
              alt="icon"
              width={iconWidth}
              height={iconHeight}
            />
          )}
        </div>
        <Image
          src={"/assets/icons/c.png"}
          alt="icon"
          width={13}
          height={13}
          className="items-end justify-end ml-48 -mt-4"
        />
      </div>
    </div>
  );
};

export default Banner;

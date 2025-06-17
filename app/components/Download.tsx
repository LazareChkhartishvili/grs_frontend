import Image from "next/image";
import React from "react";

const Download = () => {
  return (
    <div className="my-6 px-2">
      <div className="bg-[#F9F7FE] p-4 pb-0 rounded-[10px] md:flex md:flex-row md:items-center md:justify-between">
        <div className="md:flex md:flex-col md:justify-between md:h-[337px] md:py-8">
          <h1 className="text-[#3D334A] md:text-[32px] md:leading-[120%] text-[18px]">
            Возможность взаимодействия на разных платформах
          </h1>
          <div className="flex items-center gap-2 my-4">
            <Image
              src={"/assets/icons/ios.png"}
              width={80}
              height={26}
              alt="ios"
            />
            <Image
              src={"/assets/icons/android.png"}
              width={80}
              height={26}
              alt="android"
            />
          </div>
        </div>
        <Image
          src={"/assets/icons/vr.png"}
          width={172}
          height={337}
          alt="vr"
          className="mx-auto md:mx-40 md:w-[422px]"
        />
      </div>
    </div>
  );
};

export default Download;

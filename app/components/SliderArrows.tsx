import Image from "next/image";
import React from "react";

const SliderArrows = () => {
  return (
    <div className=" items-center  hidden md:block">
      <div className="bg-[#846FA0] p-[14px_17px] rounded-[16px] inline-block cursor-pointer">
        <Image
          src="/assets/images/rightIcon.svg"
          width={11}
          height={19}
          alt="rightIcon"
        />
      </div>

      <div className="bg-[#846FA0] p-[14px_17px] rounded-[16px] inline-block cursor-pointer">
        <Image
          src="/assets/images/leftIcon.svg"
          width={11}
          height={19}
          alt="rightIcon"
        />
      </div>
    </div>
  );
};

export default SliderArrows;

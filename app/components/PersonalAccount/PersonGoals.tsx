import Image from "next/image";
import React from "react";

const PersonGoals = () => {
  return (
    <div className=" p-2.5 md:p-5 bg-[#F3D57F] rounded-[10px] md:w-full">
      <div className="flex items-center gap-3">
        <Image
          src={"/assets/images/fire.png"}
          alt="fire"
          width={42}
          height={59}
        />
        <h2 className="text-white text-[26px] md:text-[32px]  tracking-[-3%]">
          Давайте поставим цель
        </h2>
      </div>
      <p className="mt-5 px-5 py-3.5 bg-[#3D334A33] rounded-[10px] text-[14px] font-medium backdrop-blur-[20px] text-center mb-2">
        Регулярные занятия помогут вам сохранить мотивацию. Настройте
        уведомления и мы поможем вам не забыть о занятии.
      </p>
      <button className="bg-white text-[#3D334A] py-[17px] pr-[43px] rounded-[10px] text-[18px] leading-[100%] tracking-[-1%] w-full">
        Поставить цель
      </button>
    </div>
  );
};

export default PersonGoals;

import React from "react";
import { statisticData } from "../data/statisticData";

const Statistics = () => {
  return (
    <div>
      <div className="bg-[#F9F7FE] p-4 md:p-10 mt-2 md:mt-5">
        <h1 className="text-[#3D334A] text-[18px] md:mb-10 mb-4 leading-[120%] tracking-[-3%] md:text-[40px] ">
          Статистика
        </h1>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          {statisticData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-[15px] max-w-[316px]"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-[#D4BAFC] text-[24px] leading-[100%] tracking-[-3%]">
                    {item.label}
                  </h2>
                  <Icon className="text-[#3D334A] w-6 h-6 hidden md:block" />
                </div>
                <p className="text-[#846FA0] leading-[120%] mt-3">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;

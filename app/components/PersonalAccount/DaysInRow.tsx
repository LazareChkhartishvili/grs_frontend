import Image from "next/image";
import React from "react";

const DaysInRow = () => {
  const days = [
    { label: "Пн", color: "#D4BAFC" },
    { label: "Вт", color: "#D4BAFC" },
    { label: "СР", color: "#D4BAFC" },
    { label: "ЧТ", color: "#D4BAFC" },
    { label: "ПТ", color: "#F9F7FE" },
    { label: "СБ", color: "#F9F7FE" },
    { label: "ВС", color: "#F9F7FE" },
  ];
  return (
    <div className="border-2 border-[#D4BAFC] rounded-[10px] p-5 md:w-full">
      <div className="flex items-start gap-2.5 mb-10">
        <Image
          src={"/assets/images/personalEnergy.png"}
          width={18}
          height={25}
          alt="fire"
        />
        <div className="flex flex-col md:w-full">
          <h4 className="text-[#D4BAFC] text-[18px] md:text-[24px] tracking-[-3%]">
            4 ДНЯ ПОДРЯД
          </h4>
          <span className="text-[#846FA0] font-medium md:text-[18px] leading-[120%]">
            Рекорд: 18 дней подряд
          </span>
        </div>
        <h4 className="text-[#D4BAFC] md:text-[24px] md:tracking-[-3%] md:w-full md:text-end">
          18: 45: 24
        </h4>
      </div>
      {/* person day row */}
      <div className="flex items-center gap-2.5">
        <div className="flex flex-row items-center gap-[4px]">
          {days.map((day, index) => (
            <div key={index}>
              <span className="text-[#3D334A] text-[14px] md:text-[18px] tracking-[-1%]">
                {day.label}
              </span>
              <div
                className="w-[30px] h-[30px] md:w-10 md:h-10 rounded-[4px]"
                style={{ backgroundColor: day.color }}
              ></div>
            </div>
          ))}
        </div>
        <span className="text-[#D4BAFC] tracking-[-3%] text-[18px] md:text-[24px] mt-4">
          X2
        </span>
      </div>
    </div>
  );
};

export default DaysInRow;

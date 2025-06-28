import React from "react";
import ChallengeCard from "./ChallengeCard";

type Achievement = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageBg?: string;
  current?: number;
  total?: number;
};

type Props = {
  achievements: Achievement[];
};

const Achievements: React.FC<Props> = ({ achievements }) => {
  return (
    <div className="p-4 bg-[#F9F7FE] mt-2 md:mt-5 rounded-[10px]">
      <h1 className="text-[#3D334A] mb-4 text-[18px] md:text-[40px] leading-[120%] tracking-[-3%]">
        Достижения
      </h1>
      <button className="hidden md:block text-[#D4BAFC] text-[24px] leading-[90%] uppercase mb-10 mt-5">
        Смотреть все →
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
        {achievements.map((item) => (
          <ChallengeCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;

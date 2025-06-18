import Image from "next/image";
import React from "react";
import SliderArrows from "./SliderArrows";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface WorksSliderProps {
  title?: string;
  works: WorkItem[];
}

const WorksSlider: React.FC<WorksSliderProps> = ({
  title = "Упражнения",
  works,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] md:text-[40px] md:tracking-[-3%] text-[#3D334A] leading-[120%] mb-2.5 md:mb-5">
          {title}
        </h2>
        <SliderArrows />
      </div>
      <div className="overflow-x-auto scrollbar-hide mb-10">
        <div className="flex gap-4">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-white p-2 w-[335px] h-[493px] flex-shrink-0"
            >
              <Image
                src={work.image}
                width={319}
                height={212}
                alt="work"
                className="w-full h-[212px] object-cover rounded mb-6"
              />

              <h2 className="p-2 bg-[#E9DFF6] rounded-[6px] text-[#3D334A] text-[18px] leading-[90%] uppercase mb-2.5">
                {work.title}
              </h2>
              <p className="max-w-[295px] h-[96px] mb-10 text-[#3D334A] leading-[100%] text-[24px]">
                {work.description}
              </p>
              <div className="w-full flex items-end justify-end">
                <button className="p-2 bg-[#D4BAFC] rounded-[6px] text-[#FFFFFF] text-[18px] leading-[90%] uppercase mb-2.5">
                  {work.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSlider;

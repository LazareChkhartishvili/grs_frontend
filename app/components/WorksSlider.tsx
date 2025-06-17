import Image from "next/image";
import React from "react";

const works = [
  {
    id: 1,
    title: "Ортопедия",
    description:
      "Улучшение динамики и подвижности грудного отдела отдела отдела отдела",
    price: "920 ₽/мес",
    image: "/assets/images/workMan.png",
  },
  {
    id: 2,
    title: "Терапия",
    description:
      "Комплекс упражнений для восстановления осанки и улучшения дыхания",
    price: "750 ₽/мес",
    image: "/assets/images/workWoman.png",
  },
  {
    id: 3,
    title: "Хирургия",
    description:
      "Упражнения после операций для ускоренного восстановления организма",
    price: "1120 ₽/мес",
    image: "/assets/images/services/work.png",
  },
  {
    id: 4,
    title: "Хирургия",
    description:
      "Упражнения после операций для ускоренного восстановления организма",
    price: "1120 ₽/мес",
    image: "/assets/images/workMan.png",
  },
];

const WorksSlider = () => {
  return (
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
  );
};

export default WorksSlider;

import Image from "next/image";
import React from "react";
import SliderArrows from "./SliderArrows";

const reviewSliderItems = [
  {
    id: 1,
    image: "/assets/images/reviewSliderImages/image1.png",
    name: "Александра",
  },
  {
    id: 2,
    image: "/assets/images/reviewSliderImages/image4.png",
    name: "Алексей",
  },
  {
    id: 3,
    image: "/assets/images/reviewSliderImages/image1.png",
    name: "Владислава",
  },
  {
    id: 4,
    image: "/assets/images/reviewSliderImages/image4.png",
    name: "Игнат",
  },
  {
    id: 5,
    image: "/assets/images/reviewSliderImages/image1.png",
    name: "Владислава",
  },
];

const ReviewSlider = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between py-5 px-6 md:py-[50px] md:px-15">
        <h1 className="text-[20px] leadig-[120%] text-[#3D334A] md:text-[40px] md:tracking-[-3%]">
          ОТЗЫВЫ О GRS
        </h1>
        <SliderArrows
          onScrollLeft={function (): void {
            throw new Error("Function not implemented.");
          }}
          onScrollRight={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <div className="py-5 px-4 md:py-10 md:px-5 bg-[#F9F7FE] rounded-[30px] w-full overflow-x-auto md:overglow-x-hidden">
        <div className="flex gap-5 w-max flex-nowrap">
          {reviewSliderItems.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center flex-col min-w-[220px] md:min-w-[300px]"
            >
              <Image
                src={item.image}
                width={349}
                height={496}
                alt={item.name}
                className="rounded-[15px] object-cover w-[220px] h-[320px] md:w-[300px] md:h-[420px] lg:w-[349px] lg:h-[496px]"
              />

              <h4 className="absolute bottom-[20px] text-center backdrop-blur-[16px] text-white py-2 px-3 w-[180px] md:w-[240px] lg:w-[289px] rounded-[10px] font-medium text-[16px] md:text-[20px] lg:text-[24px] leading-[120%]">
                {item.name}
              </h4>

              <Image
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-300 cursor-pointer w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[100px] lg:h-[100px]"
                src={"/assets/images/reviewSliderImages/playIcon.png"}
                width={100}
                height={100}
                alt="playIcon"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;

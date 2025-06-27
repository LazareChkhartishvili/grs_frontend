import Image from "next/image";
import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category?: {
    id: number;
    name: string;
  };
  instructor?: string;
  duration?: string;
  level?: "beginner" | "intermediate" | "advanced";
}

interface CourseSliderProps {
  courses?: Course[];
  maxVisible?: number;
}

const CourseSlider: React.FC<CourseSliderProps> = ({
  courses = [],
  maxVisible = 3,
}) => {
  const fallbackCourses: Course[] = [
    {
      id: 1,
      title: "Ортопедия",
      description:
        "Курсы и мастер-классы для опытных терапевтов. Практикум по лечению ортопедических проблем",
      price: "4023 $",
      image: "/assets/images/course.png",
    },
    {
      id: 2,
      title: "Ортопедия",
      description:
        "Курсы и мастер-классы для опытных терапевтов. Практикум по лечению ортопедических проблем",
      price: "4023 $",
      image: "/assets/images/course.png",
    },
    {
      id: 3,
      title: "Ортопедия",
      description:
        "Курсы и мастер-классы для опытных терапевтов. Практикум по лечению ортопедических проблем",
      price: "4023 $",
      image: "/assets/images/course.png",
    },
  ];

  const displayCourses =
    courses.length > 0 ? courses.slice(0, maxVisible) : fallbackCourses;

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex flex-row gap-4 w-max md:w-auto mb-10 mx-6">
        {displayCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-[20px] p-1.5 pb-4 w-[248px] md:w-[690px] md:h-[518px]"
          >
            {/* Mobile image */}
            <Image
              src={course.image}
              width={236}
              height={172}
              alt={`${course.title} course image`}
              className="mb-5 w-full md:hidden object-cover rounded-[16px]"
            />
            {/* Desktop image */}
            <Image
              src={course.image}
              width={674}
              height={300}
              alt={`${course.title} course image`}
              className="mb-5 w-full h-[233px] hidden md:block object-cover rounded-[16px]"
            />

            <span className="bg-[#E9DFF6] p-[4.5px] rounded-[3px] text-[#3D334A]">
              {course.category?.name || course.title}
            </span>
            <h5 className="text-[#3D334A] md:text-[32px] mb-2 mt-4 md:mb-5 leading-[120%]">
              {course.description}
            </h5>
            <p className="text-[#846FA0] md:text-[14px] mb-[14px] leading-[120%]">
              {course.instructor
                ? `Преподаватель: ${course.instructor}`
                : "С советами по безопасности, которым нужно следовать до и после перелома Кристен Гасник"}
            </p>
            <div className="w-full flex justify-end items-end pr-4 md:mt-5">
              <button className="bg-[#D4BAFC] py-[5px] px-4 rounded-[3px] text-[12px] md:text-[24px]">
                {course.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSlider;

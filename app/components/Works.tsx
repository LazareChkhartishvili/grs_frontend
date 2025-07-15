"use client";

import React from "react";
import Link from "next/link";
import WorksSlider from "./WorksSlider";
import { useI18n } from "../context/I18nContext";

interface Exercise {
  _id: string;
  title: {
    ka: string;
    en: string;
    ru: string;
  };
  description: {
    ka: string;
    en: string;
    ru: string;
  };
  difficulty: string;
  videoId?: string;
  video?: {
    url: string;
    duration: number;
    name?: string; // დავამატოთ name ველი
  };
}

interface Set {
  _id: string;
  title: {
    ka: string;
    en: string;
    ru: string;
  };
  description: {
    ka: string;
    en: string;
    ru: string;
  };
  exercises: Exercise[];
  categoryId: string;
  subcategoryId?: string;
  categoryName?: string;
  monthlyPrice: number;
}

interface WorksProps {
  title: string;
  items: Set[];
}

const Works: React.FC<WorksProps> = ({ title, items = [] }) => {
  const { t, locale } = useI18n();

  // Transform sets to work with existing WorksSlider component
  const works = items.map((set) => ({
    id: set._id,
    title: set.exercises[0]?.video?.name || "", // თუ პირველ ვიდეოს აქვს სახელი, გამოვიყენოთ ის
    description: set.description[locale] || set.description.ka || set.description.en || set.description.ru,
    image: "/assets/images/workMan.png",
    exerciseCount: set.exercises.length,
    categoryName: set.categoryName || "ორთოპედია",
    monthlyPrice: set.monthlyPrice || 920
  }));

  return (
    <div className="bg-[#F9F7FE] md:mt-0 mt-10 md:mb-10 mb-0 md:mx-5 rounded-b-[15px] md:pb-10 pb-0">
      {/* Slider */}
      <WorksSlider title={title} works={works} />
      <Link
        href="sets"
        className="text-[14px] md:px-10 px-5 md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        {t('works.all_sets', { count: works.length.toString() })}
      </Link>
    </div>
  );
};

export default Works;

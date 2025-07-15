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

  // Helper to get localized string from object or string
  const getLocalized = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (
      value &&
      typeof value === "object" &&
      locale in value &&
      typeof (value as Record<string, unknown>)[locale] === "string"
    ) {
      return (value as Record<string, string>)[locale];
    }
    return "";
  };

  // Transform sets to work with existing WorksSlider component
  const works = items.map((set) => ({
    id: set._id,
    title: getLocalized(set.title),
    description: getLocalized(set.description),
    image: "/assets/images/workMan.png", // Default image
    exerciseCount: set.exercises.length,
    categoryName: getLocalized(set.categoryName) || "ორთოპედია", // Default
    monthlyPrice: set.monthlyPrice || 920, // Default price
  }));

  return (
    <div className="bg-[#F9F7FE] md:mt-0 mt-10 md:mb-10 mb-0 md:mx-5 rounded-b-[15px] md:pb-10 pb-0">
      {/* Slider */}
      <WorksSlider title={title} works={works} />
      <Link
        href="sets"
        className="text-[14px] md:px-10 px-5 md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        {typeof t("works.all_sets", { count: works.length.toString() }) ===
        "string"
          ? t("works.all_sets", { count: works.length.toString() })
          : `All ${works.length} sets`}
      </Link>
    </div>
  );
};

export default Works;

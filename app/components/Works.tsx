"use client";

import React from "react";
import Link from "next/link";
import WorksSlider from "./WorksSlider";
import { useI18n } from "../context/I18nContext";

interface LocalizedString {
  ka: string;
  en: string;
  ru: string;
  _id: string;
}

interface BackendExercise {
  _id: string;
  name: LocalizedString;
  description: LocalizedString;
  recommendations: LocalizedString;
  videoUrl: string;
  thumbnailUrl: string;
  videoDuration: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  repetitions: string;
  sets: string;
  restTime: string;
  isActive: boolean;
  isPublished: boolean;
  sortOrder: number;
  setId: string;
  categoryId: string;
  subCategoryId?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  // populated relations
  set?: {
    _id: string;
    name: LocalizedString;
    description: LocalizedString;
  };
  category?: {
    _id: string;
    name: LocalizedString;
  };
  subcategory?: {
    _id: string;
    name: LocalizedString;
  } | null;
}

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
  items?: Set[];
  exercises?: BackendExercise[];
}

const Works: React.FC<WorksProps> = ({ title, items = [], exercises = [] }) => {
  const { t, locale } = useI18n();

  console.log("🏃‍♂️ Works component rendered with:", {
    title,
    itemsCount: items.length,
    exercisesCount: exercises.length,
    exercises: exercises,
    locale
  });

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

  // Helper to get localized text from BackendExercise LocalizedString
  const getLocalizedFromExercise = (localizedString: LocalizedString): string => {
    return localizedString[locale as keyof LocalizedString] || localizedString.ru || localizedString.en || localizedString.ka || '';
  };

  // Helper function to get valid thumbnail URL
  const getValidThumbnailUrl = (url: string | undefined): string => {
    console.log("🖼️ getValidThumbnailUrl input:", url);
    
    // თუ URL არ არის, ვიყენებთ default-ს
    if (!url) {
      console.log("🖼️ No URL provided, using default");
      return "/assets/images/workMan.png";
    }
    
    // base64 images-ის support
    if (url.startsWith('data:image')) {
      console.log("🖼️ Base64 image detected, using it");
      return url; // base64 image-ს ვიყენებთ
    }
    
    // თუ ვალიდური URL-ია
    if (url.startsWith('http') || url.startsWith('/')) {
      console.log("🖼️ Valid URL detected:", url);
      return url;
    }
    
    // სხვა შემთხვევაში default
    console.log("🖼️ Invalid URL, using default");
    return "/assets/images/workMan.png";
  };

  interface WorkItem {
    id: string;
    title: string;
    description: string;
    image: string;
    exerciseCount: number;
    categoryName: string;
    monthlyPrice: number;
    difficulty?: string;
    duration?: string;
    videoUrl?: string;
  }

  let works: WorkItem[] = [];

  console.log("🔄 Processing data...", { exercisesLength: exercises.length, itemsLength: items.length });

  // If exercises are provided, transform them for WorksSlider
  if (exercises.length > 0) {
    console.log("📝 Processing exercises...");
    works = exercises.map((exercise, index) => {
      console.log(`🏃‍♂️ Processing exercise ${index}:`, exercise);
      const result = {
        id: exercise._id,
        title: getLocalizedFromExercise(exercise.name),
        description: getLocalizedFromExercise(exercise.description),
        image: getValidThumbnailUrl(exercise.thumbnailUrl),
        exerciseCount: 1, // Single exercise
        categoryName: exercise.category ? getLocalizedFromExercise(exercise.category.name) : "ორთოპედია",
        monthlyPrice: 920, // Default price
        difficulty: exercise.difficulty,
        duration: exercise.duration,
        videoUrl: exercise.videoUrl,
      };
      console.log(`✅ Processed exercise ${index}:`, result);
      return result;
    });
  } else if (items.length > 0) {
    console.log("📝 Processing items (sets)...");
    // Transform sets to work with existing WorksSlider component
    works = items.map((set) => ({
      id: set._id,
      title: getLocalized(set.title),
      description: getLocalized(set.description),
      image: "/assets/images/workMan.png", // Default image
      exerciseCount: Array.isArray(set.exercises) ? set.exercises.length : 0,
      categoryName: getLocalized(set.categoryName) || "ორთოპედია", // Default
      monthlyPrice: set.monthlyPrice || 920, // Default price
    }));
  } else {
    console.log("⚠️ No exercises or items to process!");
  }

  console.log("🎯 Final works array:", works);

  const linkHref = exercises.length > 0 ? "/exercises" : "/sets";
  const linkText = exercises.length > 0 
    ? `All ${exercises.length} exercises`
    : `All ${items.length} sets`;

  return (
    <div className="bg-[#F9F7FE] md:rounded-[20px] md:mt-0 mt-10 md:mb-10 mb-0 md:mx-5 rounded-b-[15px] md:pb-10 pb-0">
      {/* Slider */}
      <WorksSlider title={title} works={works} />
      <Link
        href={linkHref}
        className="text-[14px] md:px-10 px-5 md:text-[24px] leading-[90%] uppercase text-[#D4BAFC]"
      >
        {typeof t("works.all_sets", { count: works.length.toString() }) ===
        "string"
          ? t("works.all_sets", { count: works.length.toString() })
          : linkText}
      </Link>
    </div>
  );
};

export default Works;

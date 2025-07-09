"use client";
import React from "react";
import Header from "./components/Header";
import Rehabilitation from "./components/Rehabilitation";
import Category from "./components/Category";
import Works from "./components/Works";
import Subscribe from "./components/Subscribe";
import Professional from "./components/Professional";
import MarketPlace from "./components/MarketPlace";
import Blog from "./components/Blog";
import Download from "./components/Download";
import Reviews from "./components/Reviews";
import { useCategories } from "./hooks/useCategories";

interface Exercise {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  videoId?: string;
  video?: {
    url: string;
    duration: number;
  };
}

interface Set {
  _id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  categoryId: string;
  subcategoryId?: string;
  categoryName?: string;
  monthlyPrice: number;
}

const Home = () => {
  const { categories } = useCategories();

  // ყველა სეტის შეგროვება კატეგორიებიდან და საბკატეგორიებიდან
  const allSets = categories.reduce((acc: Set[], category) => {
    const categorySets = (category.sets || []).map((set) => ({
      ...(set as Set),
      categoryName: category.title,
    }));

    const subcategorySets =
      category.subcategories?.reduce((subAcc: Set[], subcategory) => {
        const setsWithCategory = (subcategory.sets || []).map((set) => ({
          ...(set as Set),
          categoryName: category.title,
        }));
        return [...subAcc, ...setsWithCategory];
      }, []) || [];

    return [...acc, ...categorySets, ...subcategorySets];
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div>
        <Rehabilitation />
        <Category />
        <Works title="Упражнения" items={allSets} />
        <Subscribe
          backgroundImage="/assets/images/bluebg.jpg"
          title="Приобретите подписку для получения доступа к контенту платформы"
          buttonText="Приобрести подписку"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          containerStyles="custom-class"
          titleStyles="text-white"
          buttonStyles="hover:opacity-80"
        />

        <Professional />
        <Blog withBanner={true} withSlider={true} layoutType="default" />
        <MarketPlace />
        <Subscribe
          backgroundImage="/assets/images/categorySliderBgs/bg1.jpg"
          title="Пройдите тест и подберите подходящий вам комплекс упражнений"
          buttonText="ПРОиТИ ТЕСТИРОВАНИЕ"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          containerStyles="custom-class"
          titleStyles="text-white"
          buttonStyles="hover:opacity-80"
        />
        <Download />
        <Reviews />
        <Subscribe
          backgroundImage=""
          title="поделитесь вашими впечатлениями"
          subTitle="Пройдите небольшой опрос и оставьте пожелания о работе с нашей платформой"
          buttonText="пройти опрос"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          containerStyles="custom-class"
          titleStyles="text-[#3D334A]"
          buttonStyles="hover:opacity-80"
          bgColor="#F9F7FE"
        />
      </div>
    </div>
  );
};

export default Home;

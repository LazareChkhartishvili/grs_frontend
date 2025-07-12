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
import { useI18n } from "./context/I18nContext";

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
  const { t } = useI18n();

  // ყველა სეტის შეგროვება კატეგორიებიდან და საბკატეგორიებიდან
  const allSets = categories.reduce((acc: Set[], category) => {
    const categorySets = (category.sets || []).map(set => ({
      ...set as Set,
      categoryName: category.title
    }));
    
    const subcategorySets = category.subcategories?.reduce((subAcc: Set[], subcategory) => {
      const setsWithCategory = (subcategory.sets || []).map(set => ({
        ...set as Set,
        categoryName: category.title
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
        <Works title={('Exercises')} items={allSets} />
        <Subscribe
          backgroundImage="/assets/images/bluebg.jpg"
          titleKey="subscription.title"
          buttonTextKey="buttons.subscribe"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          containerStyles="custom-class"
          titleStyles="text-white"
          buttonStyles="hover:opacity-80"
        />

        <Professional />
        <Blog withBanner={true} withSlider={true} />
        <MarketPlace />
        <Subscribe
          backgroundImage="/assets/images/categorySliderBgs/bg1.jpg"
          titleKey="subscription.test_title"
          buttonTextKey="buttons.take_test"
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
          titleKey="subscription.feedback_title"
          subTitleKey="subscription.feedback_subtitle"
          buttonTextKey="buttons.take_survey"
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

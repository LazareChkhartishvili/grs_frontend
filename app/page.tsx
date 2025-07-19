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
import { useAllExercises } from "./hooks/useExercises";
// import { useI18n } from "./context/I18nContext";

const Home = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { exercises, loading: exercisesLoading, error: exercisesError } = useAllExercises();
  // const { t } = useI18n();

  console.log("📊 Categories loaded:", { count: categories.length, loading: categoriesLoading, error: categoriesError });
  console.log("🏃‍♂️ Exercises loaded:", { count: exercises.length, loading: exercisesLoading, error: exercisesError });

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Header />
      <div>
        <Rehabilitation />
        <Category />
        <Works title={"Exercises"} items={exercises} />
        <Subscribe
          backgroundImage="/assets/images/categorySliderBgs/bg4.jpg"
          titleKey="subscription.title"
          buttonTextKey="buttons.subscribe"
          buttonTextColor="#3D334A"
          buttonBgColor="#FFFFFF"
          containerStyles="custom-class"
          titleStyles="text-white"
          buttonStyles="hover:opacity-80"
        />
        <Professional />
        <Blog
          withBanner={true}
          withSlider={true}
          layoutType="default"
          title={"Blog"}
        />
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

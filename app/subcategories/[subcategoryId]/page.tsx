/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use } from "react";
import { useCategoryComplete } from "../../hooks/useCategoryComplete";
import Header from "../../components/Header";
import WorksSlider from "../../components/WorksSlider";
import Subscribe from "../../components/Subscribe";
import ReviewSlider from "../../components/ReviewSlider";
import Professional from "../../components/Professional";
import Blog from "@/app/components/Blog";
import { useI18n } from "../../context/I18nContext";

export default function SubcategoryPage({
  params,
}: {
  params: Promise<{ subcategoryId: string }>;
}) {
  const { subcategoryId } = use(params);
  const { t } = useI18n();

  // ვიყენებთ categoryComplete hook-ს subcategory-სთვისაც
  // ეს კოდი უნდა შეიცვალოს subcategory-ს hook-ით
  const { categoryData, loading, error } = useCategoryComplete(subcategoryId);

  // ვპოულობთ ამ კონკრეტულ subcategory-ს
  const selectedSubcategory = categoryData?.subcategories?.find(
    (sub) => sub._id === subcategoryId
  );

  // ვპოულობთ ამ subcategory-ს სეტებს
  const subcategorySets =
    categoryData?.sets?.filter(
      (set: { subCategoryId: string }) => set.subCategoryId === subcategoryId
    ) || [];

  console.log("Subcategory Data:", { selectedSubcategory, subcategorySets });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-cinzel font-semibold text-gray-700">
            {t("common.category_loading")}
          </h2>
        </div>
      </div>
    );
  }

  if (error || !selectedSubcategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">
            {t("common.category_error")}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || t("common.category_not_found")}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  // ვიღებთ ენის პარამეტრს
  const getLocale = () => {
    if (typeof window !== "undefined") {
      const storedLocale = localStorage.getItem("locale");
      return storedLocale && ["ka", "ru", "en"].includes(storedLocale)
        ? storedLocale
        : "ru";
    }
    return "ru";
  };

  const getLocalizedText = (
    field: { ka: string; en: string; ru: string } | undefined,
    locale: string = "ru"
  ): string => {
    if (!field) return "";
    return (
      field[locale as keyof typeof field] ||
      field.ru ||
      field.en ||
      field.ka ||
      ""
    );
  };

  const locale = getLocale();

  // ამოვიღოთ რაოდენობები
  const setsCount = subcategorySets.length;
  const exercisesCount = subcategorySets.reduce(
    (total: any, set: { exercises: string | any[] }) =>
      total + (set.exercises?.length || 0),
    0
  );

  // გარდავქმნით სეტებს WorksSlider-ის ფორმატში
  const formattedSets = subcategorySets.map(
    (set: {
      _id: any;
      name: { ka: string; en: string; ru: string } | undefined;
      description: { ka: string; en: string; ru: string } | undefined;
      thumbnailImage: any;
      exercises: string | any[];
      price: { monthly: any };
      categoryId: any;
    }) => ({
      id: set._id,
      title: getLocalizedText(set?.name, locale),
      description: getLocalizedText(set?.description, locale),
      image: set.thumbnailImage || "/assets/images/workMan.png",
      exerciseCount: set.exercises?.length || 0,
      categoryName: getLocalizedText(
        selectedSubcategory?.name as { ka: string; en: string; ru: string },
        locale
      ),
      price: `${set.price?.monthly || 920}₾/თვე`,
      monthlyPrice: set.price?.monthly || 920,
      categoryId: set.categoryId || "",
      subcategoryId: subcategoryId,
    })
  );

  return (
    <div className="">
      <Header
        variant="categories"
        title={getLocalizedText(
          selectedSubcategory?.name as { ka: string; en: string; ru: string },
          locale
        )}
        info={{
          setsCount,
          subcategoriesCount: 0, // subcategory-ს ქვეკატეგორიები არ აქვს
          exercisesCount,
        }}
      />
      <div className="md:pt-[100px] pt-[400px]">
        {Array.isArray(formattedSets) && formattedSets.length > 0 && (
          <div>
            <WorksSlider
              title={t("common.complexes")}
              works={formattedSets}
              linkType="complex"
              fromMain={false}
            />
          </div>
        )}

        {formattedSets.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-cinzel text-gray-600 mb-2">
              {t("common.no_sets_found")}
            </h3>
            <p className="text-gray-500">{t("common.no_sets_description")}</p>
          </div>
        )}

        <Subscribe />
        <ReviewSlider />
        <Blog
          withBanner={false}
          withSlider={true}
          layoutType="default"
          title={getLocalizedText(
            selectedSubcategory?.name as { ka: string; en: string; ru: string },
            locale
          )}
        />
        <Professional />
      </div>
    </div>
  );
}

"use client";

import { useCategories } from "../../hooks/useCategories";
import Image from "next/image";
import Header from "../../components/Header";
import SliderArrows from "../../components/SliderArrows";
import WorksSlider from "../../components/WorksSlider";
import Subscribe from "../../components/Subscribe";
import ReviewSlider from "../../components/ReviewSlider";
import Professional from "../../components/Professional";
import Blog from "@/app/components/Blog";

export default function CategoriesPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const { categories, loading, error } = useCategories();

  // ვპოულობთ არჩეულ კატეგორიას
  const selectedCategory = categories.find((cat) => cat._id === categoryId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-cinzel font-semibold text-gray-700">
            კატეგორია იტვირთება...
          </h2>
        </div>
      </div>
    );
  }

  if (error || !selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">
            შეცდომა!
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "კატეგორია ვერ მოიძებნა"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            თავიდან ცდა
          </button>
        </div>
      </div>
    );
  }

  // გარდავქმნით სეტებს WorksSlider-ის ფორმატში
  const formattedSets = selectedCategory.sets?.map((set) => ({
    id: set._id,
    title: set.title,
    description: set.description,
    image: "/assets/images/workMan.png",
    exerciseCount: set.exercises?.length || 0,
    categoryName: selectedCategory.title,
    price: `${set.monthlyPrice || 920}₾/თვე`,
    monthlyPrice: set.monthlyPrice || 920,
  }));

  return (
    <div className="">
      <Header variant="categories" title={selectedCategory.title} />
      <div className="md:pt-[100px] pt-[400px]">
        <div className="px-10 py-[50px] rounded-[30px] bg-[#F9F7FE] mx-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-5">
              <h1 className="text-[#3D334A] text-[40px] leading-[120%] tracking-[-3%]">
                {selectedCategory.title}
              </h1>
              <span className="text-[#D4BAFC] text-[24px] leading-[90%] uppercase">
                {selectedCategory.subcategories.length} საბკატეგორია
              </span>
            </div>
            <div>
              <SliderArrows
                onScrollLeft={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onScrollRight={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-[28px] overflow-x-auto">
            {selectedCategory.subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className="mt-[48px] min-w-[558px] bg-white p-2 rounded-[20px]"
              >
                <Image
                  src={"/assets/images/category1.png"}
                  width={542}
                  height={181}
                  alt={subcategory.name}
                  className="w-full h-[181px] object-cover rounded-[15px]"
                />
                <div className="flex items-center justify-between mt-[22px]">
                  <h1 className="text-[#3D334A] w-[342px] text-[28px] leading-[100%]">
                    {subcategory.name}
                  </h1>
                  <span className="text-[#D4BAFC] leading-[120%] font-medium">
                    {selectedCategory.sets?.length || 0} სეტი
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {Array.isArray(formattedSets) && formattedSets.length > 0 && (
          <div>
            <WorksSlider
              title={`${selectedCategory.title}-ის სეტები`}
              works={formattedSets}
            />
          </div>
        )}

        <Subscribe />
        <ReviewSlider />
        <Blog withBanner={false} withSlider={true} layoutType="default" />
        <Professional />
      </div>
    </div>
  );
}

"use client";

// import { useCategories } from "../context/CategoryContext";
import Image from "next/image";
import Header from "../components/Header";
import SliderArrows from "../components/SliderArrows";
import WorksSlider from "../components/WorksSlider";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import BlogSlider from "../components/BlogSlider";
import Professional from "../components/Professional";

export default function CategoriesPage() {
  const homePageWorks = [
    {
      id: 1,
      title: "Ортопедия",
      description: "Улучшение динамики и подвижности грудного отдела",
      price: "920 ₽/мес",
      image: "/assets/images/workMan.png",
    },
    {
      id: 2,
      title: "Ортопедия",
      description: "Улучшение динамики и подвижности грудного отдела",
      price: "920 ₽/мес",
      image: "/assets/images/workMan.png",
    },
    {
      id: 3,
      title: "Ортопедия",
      description: "Улучшение динамики и подвижности грудного отдела",
      price: "920 ₽/мес",
      image: "/assets/images/workMan.png",
    },
    {
      id: 4,
      title: "Ортопедия",
      description: "Улучшение динамики и подвижности грудного отдела",
      price: "920 ₽/мес",
      image: "/assets/images/workMan.png",
    },
  ];
  // const { categories, loading, error } = useCategories();

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
  //         <h2 className="text-2xl font-cinzel font-semibold text-gray-700">
  //           კატეგორიები იტვირთება...
  //         </h2>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
  //       <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
  //         <div className="text-red-500 text-6xl mb-4">⚠️</div>
  //         <h2 className="text-2xl font-cinzel font-bold text-red-600 mb-4">
  //           შეცდომა!
  //         </h2>
  //         <p className="text-gray-600 mb-6">{error}</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
  //         >
  //           თავიდან ცდა
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      {/* Header Section */}
      <Header variant="categories" />
      <div className="md:pt-[100px] pt-[400px]">
        <div className="px-10 py-[50px] rounded-[30px] bg-[#F9F7FE] mx-6">
          <div className=" flex items-center justify-between">წ
            <div className="flex flex-col gap-5">
              <h1 className="text-[#3D334A] text-[40px] leading-[120%] tracking-[-3%]">
                Разделы
              </h1>
              <span className="text-[#D4BAFC] text-[24px] leading-[90%] uppercase">
                Смотреть все →
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
          {/*  */}
          <div className="flex flex-row items-center gap-[28px]">
            <div className="mt-[48px] w-[558px] bg-white p-2 rounded-[20px] ">
              <Image
                src={"/assets/images/category1.png"}
                width={542}
                height={181}
                alt="category1"
              />
              <div className="flex items-center justify-between mt-[22px]">
                <h1 className="text-[#3D334A] w-[342px] text-[28px] leading-[100%]">
                  Шейный отдел позвоночника
                </h1>
                <span className="text-[#D4BAFC] leading-[120%] font-medium">
                  12 комплексов
                </span>
              </div>
            </div>
            {/*  */}

            <div className="mt-[48px] w-[558px] bg-white p-2 rounded-[20px]">
              <Image
                src={"/assets/images/category1.png"}
                width={542}
                height={181}
                alt="category1"
              />
              <div className="flex items-center justify-between mt-[22px]">
                <h1 className="text-[#3D334A] w-[342px] text-[28px] leading-[100%]">
                  Шейный отдел позвоночника
                </h1>
                <span className="text-[#D4BAFC] leading-[120%] font-medium">
                  12 комплексов
                </span>
              </div>
            </div>
            {/*  */}
            <div className="mt-[48px] w-[558px] bg-white p-2 rounded-[20px]">
              <Image
                src={"/assets/images/category1.png"}
                width={542}
                height={181}
                alt="category1"
              />
              <div className="flex items-center justify-between mt-[22px]">
                <h1 className="text-[#3D334A] w-[342px] text-[28px] leading-[100%]">
                  Шейный отдел позвоночника
                </h1>
                <span className="text-[#D4BAFC] leading-[120%] font-medium">
                  12 комплексов
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <WorksSlider title="Комплексы" works={homePageWorks} />
        <Subscribe />
        <ReviewSlider />
        <BlogSlider currentPage={1} blogsPerPage={6} />
        <Professional />
      </div>
    </div>
  );
}

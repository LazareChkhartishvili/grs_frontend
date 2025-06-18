import React from "react";
import { CiPlay1 } from "react-icons/ci";
import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import BlogSlider from "../components/BlogSlider";
import Professional from "../components/Professional";

const Complex = () => {
  return (
    <div>
      <Header />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 md:mt-40 px-4">
        <div className="md:col-span-2 order-2 md:order-1 bg-[rgba(233,223,246,1)] md:p-[40px] p-4 rounded-[20px] flex md:gap-[40px] gap-6 items-center relative">
          <div className="relative group">
            <a
              href=""
              className="text-[rgba(132,111,160,1)] md:text-2xl text-[14px] leading-[90%] md:leading-[120%] tracking-[0%] uppercase group-hover:text-[rgba(61,51,74,1)]"
            >
              Описание
            </a>

            <div className="absolute left-0 -bottom-[42px] h-[2px] w-full bg-[rgba(61,51,74,1)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
          </div>

          <div className="relative group">
            <a
              href=""
              className="text-[rgba(132,111,160,1)] md:text-2xl text-[14px] leading-[90%] md:leading-[120%] tracking-[0%] uppercase group-hover:text-[rgba(61,51,74,1)]"
            >
              Дополнительно
            </a>
            <div className="absolute left-0 -bottom-[42px] h-[2px] w-full bg-[rgba(61,51,74,1)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
          </div>

          <div className="relative group">
            <a
              href=""
              className="text-[rgba(132,111,160,1)] md:text-2xl text-[14px] leading-[90%] md:leading-[120%] tracking-[0%] uppercase group-hover:text-[rgba(61,51,74,1)]"
            >
              Демо-видео
            </a>
            <div className="absolute left-0 -bottom-[42px] h-[2px] w-full bg-[rgba(61,51,74,1)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
          </div>
        </div>

        <div className="order-3 md:order-2 p-4 md:p-[40px] bg-[rgba(249,247,254,1)] rounded-[20px] md:rounded-[30px]">
          <div className="flex flex-col md:gap-5 gap-4 pb-6 md:pb-[80px]">
            <strong className="text-[rgba(61,51,74,1)] tracking-[-3%] leading-[120%] text-[18px] md:text-[40px] font-medium">
              Комплекс состоит <br /> из 8 упражнений,
              <br /> общая длительность комплекса <br />
              39:38 мин
            </strong>
            <span className="text-[rgba(132,111,160,1)] md:text-2xl text-[16px] leading-[120%] font-medium">
              Необходимые аксессуары: стул устойчивый <br />
              со спинкой, гимнастический коврик
            </span>
          </div>
          <div>
            <h4 className="mb-[10px] text-[rgba(61,51,74,1)] tracking-[-1%] leading-[100%] text-[18px] ">
              Общие указания:
            </h4>
            <p className="text-[rgba(132,111,160,1)] md:text-[18px] tex-[14px] leading-[150%]  ">
              В соответсвии со стадией прогрессирования болезни необходимо
              выстроить комплекс и программу реабилитационных упражнений.В
              соответсвии со стадией прогрессирования болезни необходимо
              выстроить комплекс и программу реабилитационных упражнений
              <br className="mb-[20px]" /> В соответсвии со стадией
              прогрессирования болезни необходимо выстроить комплекс и программу
              реабилитационных упражнений.В соответсвии со стадией
              прогрессирования болезни необходимо выстроить комплекс и программу
            </p>
          </div>
        </div>

        <div className="order-1 md:order-3 flex flex-col md:gap-4 gap-5">
          <div className="bg-[url('/assets/images/blog.png')] bg-cover bg-center bg-no-repeat p-5 rounded-[10px] flex justify-between items-center">
            <div className="flex md:flex-row md:gap-[40px] flex-col  md:items-center">
              <h3 className="text-[rgba(255,255,255,1))] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                Начальный уровень
              </h3>
              <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                10 упражнений
              </span>
            </div>
            {/* <Image
            className="md:w-[19.28px] md:h-[25.44px] w-[14.28px] h-[19px]"
            src="../../public/play-icon.png"
            alt="play icon"
            width={19.28}
            height={25.44}
          /> */}
            <CiPlay1 width={19.28} height={25.44} />
          </div>

          <div className="bg-[rgba(249,247,254,1)]  p-5 rounded-[10px] flex justify-between items-center">
            <div className="flex md:flex-row md:gap-[40px] flex-col  md:items-center">
              <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                Средний уровень
              </h3>
              <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                10 упражнений
              </span>
            </div>
            {/* <Image src="../../public/block-icon.png" alt="block icon" /> */}
            <CiPlay1 width={19.28} height={25.44} />
          </div>
          <div className="bg-[rgba(249,247,254,1)]  p-5 rounded-[10px] flex justify-between items-center">
            <div className="flex md:flex-row md:gap-[40px] flex-col md:items-center">
              <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                Продвинутый уровень
              </h3>
              <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                10 упражнений
              </span>
            </div>
            {/* <Image src="../../public/block-icon.png" alt="block icon" /> */}
            <CiPlay1 width={19.28} height={25.44} />
          </div>
        </div>
      </section>
      <Subscribe />
      <ReviewSlider />
      <BlogSlider />
      <Professional />
    </div>
  );
};

export default Complex;
